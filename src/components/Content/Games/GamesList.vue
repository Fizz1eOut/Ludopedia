<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useGameFiltersStore } from '@/stores/gameFiltersStore';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';
  import AppGameCard from '@/components/Base/AppGameCard.vue';

  const gameFiltersStore = useGameFiltersStore();

  onMounted(() => {
    gameFiltersStore.fetchGames();
  });
</script>

<template>
  <div class="games-list">
    <app-loading-spinner 
      v-if="gameFiltersStore.loading" size="80px" 
      borderWidth="6px"
      height="300px" 
    />
    <div v-else-if="gameFiltersStore.games.length === 0" class="games-list__empty-state">
      <div>No games found</div>
      <div>Try changing your filtering options.</div>
    </div>

    <div v-else class="games-list__body">
      <div 
        v-for="game in gameFiltersStore.games" 
        :key="game.name"
        class="games-list__item"
      >
        <app-game-card :game="game" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .games-list {
    width: 100%;
  }
  .games-list__empty-state {
    text-align: center;
    font-size: var(--font-size-lg);
    color: var(--text-primary);
  }
  .games-list__body {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 10px;
    row-gap: var(--space-md);
  }
  .games-list__item {
    max-width: 350px;
    display: flex;
    flex: 1 1 auto;
    height: auto;
  }
</style>
