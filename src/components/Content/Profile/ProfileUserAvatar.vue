<script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue';
  import { supabase } from '@/utils/supabase';
  import { useAvatarStore } from '@/stores/useAvatarStore';

  interface ProfileUserAvatarProps {
    userId?: string;
    size?: string;
  }
  const props = defineProps<ProfileUserAvatarProps>();

  const targetUserId = ref<string | null>(null);
  const avatarStore = useAvatarStore();
  const imageError = ref(false);

  const storeAvatarUrl = computed(() => {
    if (!targetUserId.value) return null;
    return avatarStore.getAvatarUrl(targetUserId.value);
  });

  const avatarUrl = computed(() => {
    if (imageError.value) return null;
    return storeAvatarUrl.value;
  });

  const loading = computed(() => {
    if (!targetUserId.value) return false;
    return avatarStore.isLoading(targetUserId.value);
  });

  function handleImageError() {
    imageError.value = true;
  }

  watch(storeAvatarUrl, (newUrl, oldUrl) => {
    if (newUrl && newUrl !== oldUrl) {
      imageError.value = false;
    }
  });

  async function initializeUserId() {
    if (props.userId) {
      targetUserId.value = props.userId;
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      targetUserId.value = user.id;
    }
  }

  async function loadAvatar() {
    if (!targetUserId.value) return;
    await avatarStore.loadAvatar(targetUserId.value);
  }

  onMounted(async () => {
    await initializeUserId();
    if (targetUserId.value) {
      await loadAvatar();
    }
  });
</script>

<template>
  <div class="avatar">
    <img 
      v-if="avatarUrl && !loading" 
      :src="avatarUrl" 
      :style="{ width: size, height: size }"
      class="avatar__image"
      @error="handleImageError"
    />
    <div v-else>
      <svg fill="currentColor" viewBox="0 0 20 20" :style="{ width: size, height: size }"
           class="avatar__svg">
        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
  .avatar__image {
    border-radius: var(--radius-full);
  }
</style>
