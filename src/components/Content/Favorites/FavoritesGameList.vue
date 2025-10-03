<script setup lang="ts">
  import AppGameCard from '@/components/Base/AppGameCard.vue';
  import { useFavoritesStore } from '@/stores/favoritesStore';

  const favoritesStore = useFavoritesStore();
</script>

<template>
  <div class="favorites-game__list">
    <app-game-card 
      v-for="game in favoritesStore.favoriteGames"
      :key="game.id"
      :game="game"
      class="favorites-game__item"
    />
  </div>
</template>

<style scoped>
 .favorites-game__list {
  margin-top: var(--space-xl);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
  row-gap: var(--space-md);
}
</style>
