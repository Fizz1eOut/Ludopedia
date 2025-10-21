<script setup lang="ts">
  import { ref, watch } from 'vue';
  import Multiselect from '@vueform/multiselect';
  import '@vueform/multiselect/themes/default.css';
  import { getFilteredGames } from '@/api/gamesApi';
  import { debounce } from '@/utils/debounce';
  import { useRouter } from 'vue-router';

  interface SelectOption {
    label: string;
    value: number;
  }

  const router = useRouter();
  const selected = ref<SelectOption | null>(null);
  const options = ref<SelectOption[]>([]);
  const searchQuery = ref('');

  const fetchGames = async (query: string) => {
    if (!query.trim()) {
      options.value = [];
      return;
    }

    try {
      const games = await getFilteredGames({ search: query, limit: 20 });
      options.value = games.map((game) => ({
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
    debouncedFetch(newQuery);
  });

  const handleSelect = (option: SelectOption | number | null) => {
    if (typeof option === 'number') {
      router.push({ name: 'game', params: { id: String(option) } });
      return;
    }

    if (option && option.value) {
      router.push({ name: 'game', params: { id: String(option.value) } });
      return;
    }

    console.warn('No valid game selected:', option);
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
    @update:model-value="handleSelect"
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
