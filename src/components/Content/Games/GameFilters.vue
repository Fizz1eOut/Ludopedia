<script setup lang="ts">
  import GenreFilter from '@/components/Content/Filters/GenreFilter.vue';
  import PlatformFilter from '@/components/Content/Filters/PlatformFilter.vue';
  import SortFilter from '@/components/Content/Filters/SortFilter.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import { useGameFiltersStore } from '@/stores/gameFiltersStore';

  const gameFiltersStore = useGameFiltersStore();
</script>

<template>
  <div class="games-filters">
    <app-underlay>
      <app-container>
        <div class="games-filters__header">
          <div class="games-filters__row">
            <app-title>Filters</app-title>
            <app-button 
              v-if="gameFiltersStore.hasActiveFilters"
              class="games-filters__clear-btn"
              @click="gameFiltersStore.clearFilters"
            >
              Reset all
            </app-button>
          </div>
          <div v-if="gameFiltersStore.hasActiveFilters" class="games-filters__info">
            Active filters: 
            <span class="games-filters__count">
              {{ gameFiltersStore.activeFiltersCount }}
            </span>
          </div>
        </div>

        <div class="games-filters__content">
          <sort-filter />
          <GenreFilter />
          <PlatformFilter />
        </div>
      </app-container>
    </app-underlay>
  </div>
</template>

<style scoped>
  .games-filters {
    max-width: 350px;
    width: 100%;
    position: sticky;
    top: 20px;
    max-height: calc(100vh - 40px);
  }
  .games-filters__header {
    margin-bottom: var(--space-md);
  }
  .games-filters__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  .games-filters__info {
    margin-bottom: var(--space-md);
    color: var(--text-secondary);
  }
  .games-filters__info .games-filters__count {
    color: var(--text-primary);
  }
  .games-filters__clear-btn {
    max-width: 80px;
    width: 100%;
    font-size: var(--font-size-md);
    color: var(--red-500);
    transition: color 0.3s ease-in-out;
  }
  .games-filters__clear-btn:hover {
    color: var(--red-600);
  }
  .games-filters__content > *:not(:last-child){
    margin-bottom: var(--space-md);
  }
</style>
