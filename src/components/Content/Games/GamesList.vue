<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useGameFiltersStore } from '@/stores/gameFiltersStore';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';
  import AppGameCard from '@/components/Base/AppGameCard.vue';
  import AppButton from '@/components/Base/AppButton.vue';

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
      <ul class="games-list__list">
        <li 
          v-for="game in gameFiltersStore.games" 
          :key="game.name"
          class="games-list__item"
        >
          <app-game-card :game="game" />
        </li>
      </ul>
      <div class="games-list__pagination">
        <div class="pagination">
          <app-button 
            :disabled="gameFiltersStore.page === 1"
            @click="gameFiltersStore.prevPage"
            class="pagination__btn"
            primary
          >
            <span>←</span> Prev
          </app-button>

          <span class="pagination__indicator">Page {{ gameFiltersStore.page }}</span>

          <app-button 
            @click="gameFiltersStore.nextPage"
            :disabled="gameFiltersStore.games.length < gameFiltersStore.limit"
            class="pagination__btn"
            primary
          >
            Next <span>→</span>
          </app-button>
        </div>
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
  .games-list__list {
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
  .games-list__pagination {
    margin-top: var(--space-md);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
  .pagination {
    max-width: 400px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  .pagination__indicator {
    width: 74px;
    text-align: center;
    font-size: var(--font-size-sm);
    padding: 8px;
    background-color: var(--surface-color);
    border-radius: var(--radius-md);
  }
  .pagination__btn {
    max-width: 100px;
    height: var(--space-lg);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: var(--font-size-sm);
  }
  @media (max-width: 610px) {
    .games-list__item {
      max-width: 100%;
    }
  }
</style>
