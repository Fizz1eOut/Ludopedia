import { defineStore } from 'pinia';
import { ref, computed, readonly } from 'vue';
import { supabase } from '@/utils/supabase';
import { useAuthStore } from '@/stores/authStore';
import type { PostgrestError } from '@supabase/supabase-js';
import type { Review as DBReview } from '@/interface/database.interface';

export interface Review {
  id: string
  created_at: string
  user_id: string
  game_id: string
  rating: number
  comment: string
  user?: {
    username?: string | null
    avatar_url?: string | null
  }
}

interface ReviewResponse {
  success: boolean
  error?: string
  data?: Review | null
}

type ProfileSlim = { username?: string | null; avatar_url?: string | null }
type ReviewWithProfile = DBReview & { profiles?: ProfileSlim }

export const useReviewsStore = defineStore('reviews', () => {
  const reviews = ref<Review[]>([]);
  const userReviews = ref<Review[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const averageRating = computed(() => {
    if (reviews.value.length === 0) return 0;
    const total = reviews.value.reduce((sum, r) => sum + (r.rating || 0), 0);
    return parseFloat((total / reviews.value.length).toFixed(1));
  });

  const userReviewsCount = computed(() => userReviews.value.length);

  const loadReviews = async (gameId: string): Promise<void> => {
    try {
      loading.value = true;
      error.value = null;

      const resp = (await supabase
        .from('reviews')
        .select('*, profiles(username, avatar_url)')
        .eq('game_id', gameId)
        .order('created_at', { ascending: false })) as {
          data: ReviewWithProfile[] | null
          error: PostgrestError | null
        };

      if (resp.error) throw resp.error;

      reviews.value = (resp.data ?? []).map((r) => ({
        id: r.id,
        created_at: r.created_at,
        user_id: r.user_id,
        game_id: r.game_id,
        rating: r.rating,
        comment: r.comment,
        user: r.profiles
          ? {
            username: r.profiles.username ?? null,
            avatar_url: r.profiles.avatar_url ?? null
          }
          : undefined
      }));
    } catch (err: unknown) {
      console.error(err);
      error.value = err instanceof Error ? err.message : 'Error loading reviews';
    } finally {
      loading.value = false;
    }
  };

  const loadUserReviews = async (): Promise<void> => {
    const auth = useAuthStore();
    if (!auth.isAuthenticated || !auth.userId) {
      userReviews.value = [];
      return;
    }

    try {
      loading.value = true;
      error.value = null;

      const resp = (await supabase
        .from('reviews')
        .select('*, profiles(username, avatar_url)')
        .eq('user_id', auth.userId)
        .order('created_at', { ascending: false })) as {
          data: ReviewWithProfile[] | null
          error: PostgrestError | null
        };

      if (resp.error) throw resp.error;

      userReviews.value = (resp.data ?? []).map((r) => ({
        id: r.id,
        created_at: r.created_at,
        user_id: r.user_id,
        game_id: r.game_id,
        rating: r.rating,
        comment: r.comment,
        user: r.profiles
          ? {
            username: r.profiles.username ?? null,
            avatar_url: r.profiles.avatar_url ?? null
          }
          : undefined
      }));
    } catch (err: unknown) {
      console.error(err);
      error.value = err instanceof Error ? err.message : 'Error loading user reviews';
    } finally {
      loading.value = false;
    }
  };

  const addReview = async (gameId: string, rating: number, comment: string): Promise<ReviewResponse> => {
    const auth = useAuthStore();
    if (!auth.isAuthenticated || !auth.userId) {
      return { success: false, error: 'You must log in to add a review' };
    }

    try {
      loading.value = true;
      error.value = null;

      const { data, error: insertError } = await supabase
        .from('reviews')
        .insert({
          user_id: auth.userId,
          game_id: gameId,
          rating,
          comment
        })
        .select('*')
        .single();

      if (insertError) throw insertError;

      await loadReviews(gameId);
      await loadUserReviews();

      return { success: true, data: data as Review };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error adding review';
      error.value = msg;
      return { success: false, error: msg };
    } finally {
      loading.value = false;
    }
  };

  const deleteReview = async (reviewId: string): Promise<ReviewResponse> => {
    const auth = useAuthStore();
    if (!auth.isAuthenticated || !auth.userId) {
      return { success: false, error: 'You must log in to delete a review' };
    }

    try {
      const { error: deleteError } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId)
        .eq('user_id', auth.userId);

      if (deleteError) throw deleteError;

      reviews.value = reviews.value.filter(r => r.id !== reviewId);
      userReviews.value = userReviews.value.filter(r => r.id !== reviewId);
      
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error deleting review';
      error.value = msg;
      return { success: false, error: msg };
    }
  };

  return {
    reviews: readonly(reviews),
    userReviews: readonly(userReviews),
    loading: readonly(loading),
    error: readonly(error),
    averageRating,
    userReviewsCount,
    loadReviews,
    loadUserReviews,
    addReview,
    deleteReview
  };
});
