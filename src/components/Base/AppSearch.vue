<script setup lang="ts">
  import { ref, watch } from 'vue';
  import Multiselect from '@vueform/multiselect';
  import '@vueform/multiselect/themes/default.css';
  import { searchGames } from '@/api/searchGames';
  import type { Game } from '@/interface/game.interface';
  import { debounce } from '@/utils/debounce';

  const selected = ref<Game | null>(null);
  console.log('Selected game:', selected.value);
  const options = ref<Game[]>([]);
  console.log('Available games:', options.value);
  const searchQuery = ref('');
  console.log('Current request:', searchQuery.value); 

  const fetchGames = async (query: string) => {
    if (!query.trim()) {
      options.value = [];
      return;
    }

    try {
      const games = await searchGames(query);
      options.value = games.map((game) => ({
        ...game,
        label: game.name,
        value: game.id,
      }));
    } catch (err) {
      console.error('Search error:', err);
      options.value = [];
    }
  };
  
  const debouncedFetch = debounce(fetchGames, 300);

  watch(searchQuery, (newQuery) => {
    console.log('Updating request:', newQuery);
    debouncedFetch(newQuery);
  });

  const handleSelect = (option: Game) => {
    console.log('Click on the hint:', option);
  };

</script>

<template>
  <Multiselect
    v-model="selected"
    :options="options"
    label="label"
    track-by="value"
    placeholder="Enter the name of the game"
    class="custom-multiselect"
    searchable
    :filter-results="false"
    :internal-search="false"
    :resolve-on-load="false"
    @search-change="searchQuery = $event"
    @select="handleSelect"
  />
</template>

<style>
  .custom-multiselect {
    display: block;
    width: 100%;
    max-width: 760px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-sm);
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
