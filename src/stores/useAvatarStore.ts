import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '@/utils/supabase';

export const useAvatarStore = defineStore('avatar', () => {
  const avatarCache = ref<Record<string, string | null>>({});
  const loading = ref<Record<string, boolean>>({});

  async function loadAvatar(userId: string): Promise<string | null> {
    if (loading.value[userId]) {
      return avatarCache.value[userId] || null;
    }

    if (avatarCache.value[userId] !== undefined) {
      return avatarCache.value[userId];
    }

    try {
      loading.value[userId] = true;

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      const avatarUrl = profile?.avatar_url || null;
      avatarCache.value[userId] = avatarUrl;
      
      return avatarUrl;
    } catch (error) {
      console.error('Error loading avatar:', error);
      avatarCache.value[userId] = null;
      return null;
    } finally {
      loading.value[userId] = false;
    }
  }

  function updateAvatarCache(userId: string, newAvatarUrl: string) {
    avatarCache.value[userId] = newAvatarUrl;
  }

  function clearAvatarCache(userId: string) {
    delete avatarCache.value[userId];
  }

  function clearAllCache() {
    avatarCache.value = {};
    loading.value = {};
  }

  function getAvatarUrl(userId: string) {
    return avatarCache.value[userId] || null;
  }

  function isLoading(userId: string) {
    return loading.value[userId] || false;
  }

  return {
    avatarCache,
    loading,
    loadAvatar,
    updateAvatarCache,
    clearAvatarCache,
    clearAllCache,
    getAvatarUrl,
    isLoading
  };
});
