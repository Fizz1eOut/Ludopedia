import { defineStore } from 'pinia';
import { ref, computed, readonly } from 'vue';
import { supabase } from '@/utils/supabase';
import { useAuthStore } from '@/stores/authStore';
import type { Favorite, FavoriteInsert } from '@/interface/database.interface';

interface FavoritesResponse {
  success: boolean
  error?: string
  data?: Favorite | null
}

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<Favorite[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const favoritesCount = computed(() => favorites.value.length);
  const favoriteItems  = computed(() => favorites.value.map(f => f.item));
  const isFavorite = computed(() => (item: string) =>
    favorites.value.some(f => f.item === item)
  );

  const clearError = () => { error.value = null; };

  const loadFavorites = async (): Promise<void> => {
    const auth = useAuthStore();
    if (!auth.isAuthenticated || !auth.userId) {
      favorites.value = [];
      return;
    }
    try {
      loading.value = true;
      error.value = null;

      const { data, error: fetchError } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', auth.userId)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      favorites.value = (data ?? []) as Favorite[];
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Error loading favorites';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const addToFavorites = async (item: string): Promise<FavoritesResponse> => {
    const auth = useAuthStore();
    if (!auth.isAuthenticated || !auth.userId) {
      return { success: false, error: 'You must log in to your account' };
    }
    if (isFavorite.value(item)) {
      return { success: false, error: 'The item is already in favorites' };
    }

    try {
      loading.value = true;
      error.value = null;

      const newFavorite: FavoriteInsert = {
        user_id: auth.userId,
        item
      };

      const { data, error: insertError } = await supabase
        .from('favorites')
        .insert(newFavorite)
        .select()
        .single();

      if (insertError) throw insertError;

      if (data) {
        favorites.value.unshift(data as Favorite);
      }

      return { success: true, data: data as Favorite };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error adding to favorites';
      error.value = msg;
      return { success: false, error: msg };
    } finally {
      loading.value = false;
    }
  };

  const removeFromFavorites = async (item: string): Promise<FavoritesResponse> => {
    const auth = useAuthStore();
    if (!auth.isAuthenticated || !auth.userId) {
      return { success: false, error: 'You must log in to your account' };
    }

    try {
      loading.value = true;
      error.value = null;

      const { error: deleteError } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', auth.userId)
        .eq('item', item);

      if (deleteError) throw deleteError;

      favorites.value = favorites.value.filter(f => f.item !== item);
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error removing from favorites';
      error.value = msg;
      return { success: false, error: msg };
    } finally {
      loading.value = false;
    }
  };

  const toggleFavorite = async (item: string): Promise<FavoritesResponse> =>
    isFavorite.value(item) ? removeFromFavorites(item) : addToFavorites(item);

  const clearFavorites = async (): Promise<void> => {
    const auth = useAuthStore();
    if (!auth.isAuthenticated || !auth.userId) return;

    try {
      loading.value = true;
      const { error: deleteError } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', auth.userId);

      if (deleteError) throw deleteError;
      favorites.value = [];
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Error clearing favorites';
    } finally {
      loading.value = false;
    }
  };

  return {
    favorites: readonly(favorites),
    loading: readonly(loading),
    error: readonly(error),
  
    favoritesCount,
    favoriteItems,
    isFavorite,
  
    clearError,
    loadFavorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    clearFavorites
  };
});
