<script setup lang="ts">
  import { watch, onMounted } from 'vue';
  import FavoritesPanel from '@/components/Content/Favorites/FavoritesPanel.vue';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';
  import { useFavoritesStore } from '@/stores/favoritesStore';
  import { useAuthStore } from '@/stores/authStore';

  const favoritesStore = useFavoritesStore();
  const auth = useAuthStore();

  onMounted(() => {
    favoritesStore.loadFavorites();
  });

  watch(
    () => auth.userId,
    (newUserId) => {
      if (newUserId) {
        favoritesStore.loadFavorites();
      }
    },
    { immediate: true }
  );

</script>

<template>
  <div class="favorites">
    <app-loading-spinner v-if="favoritesStore.loading" />
    <div v-else class="favorites__body">
      <favorites-panel />
    </div>
  </div>
</template>

<style scoped>

</style>
