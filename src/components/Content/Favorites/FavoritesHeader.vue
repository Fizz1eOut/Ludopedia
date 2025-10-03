<script setup lang="ts">
  import AppTitle from '@/components/Base/AppTitle.vue';
  import { useFavoritesStore } from '@/stores/favoritesStore';

  const favoritesStore = useFavoritesStore();
</script>

<template>
  <div class="favorites-header">
    <app-title>
      Favorite Games
    </app-title>

    <div class="favorites-header__length" v-if="favoritesStore.favoriteGames.length > 0">
      {{ favoritesStore.favoriteGames.length }} 
      {{ favoritesStore.favoriteGames.length === 1 ? 'game' : 'games' }} in your list.
    </div>

    <p v-if="favoritesStore.favoriteGames.length === 0" class="favorites-header__no-favorites">
      You haven’t added any games to favorites yet.
    </p>
  </div>
</template>

<style scoped>
  .favorites-header {
    margin-top: var(--space-md);
  }
  .favorites-header__length {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }
  .favorites-header__no-favorites {
    font-size: var(--font-size-md);
    color: var(--color-text-secondary);
  }
</style>
