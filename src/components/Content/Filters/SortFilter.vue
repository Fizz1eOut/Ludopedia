<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue';
  import Multiselect from '@vueform/multiselect';
  import '@vueform/multiselect/themes/default.css';
  import { useGameFiltersStore } from '@/stores/gameFiltersStore';
  import AppTitle from '@/components/Base/AppTitle.vue';

  const gameFiltersStore = useGameFiltersStore();
  const selectedSort = ref('rating desc');

  const sortOptions = [
    { value: 'rating desc', label: 'Rating (High to Low)' },
    { value: 'rating asc', label: 'Rating (Low to High)' },
    { value: 'first_release_date desc', label: 'Release Date (Newest)' },
    { value: 'first_release_date asc', label: 'Release Date (Oldest)' },
  ];

  onMounted(() => {
    selectedSort.value = gameFiltersStore.filters.sort;
  });

  watch(
    () => gameFiltersStore.filters.sort,
    (newSort) => {
      if (selectedSort.value !== newSort) {
        selectedSort.value = newSort;
      }
    }
  );

  const handleSortChange = (value: string) => {
    console.log('Sort changed to:', value);
    gameFiltersStore.filters.sort = value;
    gameFiltersStore.fetchGames();
  };
</script>

<template>
  <div class="sort-filter">
    <app-title class="filter-title">Sort By</app-title>
    
    <Multiselect
      v-model="selectedSort"
      :options="sortOptions"
      :searchable="false"
      :can-clear="false"
      placeholder="Select sorting"
      class="custom-multiselect"
      @change="handleSortChange"
    />
  </div>
</template>

<style scoped>
  .custom-multiselect {
    --ms-tag-bg: rgb(20 83 45 / 0.3);
    --ms-tag-color: var(--green-400);
    --ms-tag-radius: var(--radius-sm);
    --ms-border-color: var(--green-400);
    --ms-border-width: 1px;
  }
  :deep(.custom-multiselect.multiselect) {
    background-color: var(--surface-color);
    color: var(--color-white);
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-sm); 
  }
  :deep(.custom-multiselect .multiselect-tags-search) {
    background-color: var(--surface-color);
  }
  .custom-multiselect .multiselect-search {
    color: var(--color-white);
    background-color: var(--surface-color);
  }
  .custom-multiselect.is-active {
    border: 1px solid var(--border-color);
    outline: none;
    box-shadow: none;
  }
  .custom-multiselect .multiselect-dropdown {
    border: 1px solid var(--border-color);
    outline: none;
    box-shadow: none;
  }
  .custom-multiselect .multiselect__content {
    background-color: var(--surface-color);
    color: var(--color-white);
  }
  .custom-multiselect .multiselect-dropdown {
    background-color: var(--surface-color);
  }
</style>
