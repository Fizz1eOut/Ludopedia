<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import Multiselect from '@vueform/multiselect';
  import '@vueform/multiselect/themes/default.css';
  import { getGenres, type Genre } from '@/api/genresApi';
  import { useGameFiltersStore } from '@/stores/gameFiltersStore';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';

  const gameFiltersStore = useGameFiltersStore();
  const genres = ref<Genre[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const genreOptions = computed(() => {
    return genres.value.map(genre => ({
      id: genre.id,
      name: genre.name,
    }));
  });

  const selectedGenres = computed({
    get: () => gameFiltersStore.filters.genres,
    set: () => {
    }
  });

  const handleGenreChange = (value: number[]) => {
    const currentGenres = gameFiltersStore.filters.genres;
  
    const added = value.filter(id => !currentGenres.includes(id));
    const removed = currentGenres.filter(id => !value.includes(id));

    added.forEach(id => gameFiltersStore.toggleGenre(id));
    removed.forEach(id => gameFiltersStore.toggleGenre(id));
  };

  const fetchGenres = async () => {
    loading.value = true;
    error.value = null;
  
    try {
      genres.value = await getGenres();
    } catch (e) {
      error.value = 'Failed to load genres';
      console.error('Error fetching genres:', e);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchGenres();
  });
</script>

<template>
  <div class="genre-filter">
    <app-title class="filter-title">Genres</app-title>
    
    <app-loading-spinner 
      v-if="loading" size="80px" 
      borderWidth="6px"
      height="300px" 
    />
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <Multiselect
      v-else
      v-model="selectedGenres"
      :options="genreOptions"
      mode="tags"
      :close-on-select="false"
      :searchable="true"
      :create-option="false"
      :filter-results="true"
      :min-chars="0"
      placeholder="Select genres"
      value-prop="id"
      label="name"
      track-by="name"
      class="custom-multiselect"
      @change="handleGenreChange"
    >
      <template #tag="{ option, handleTagRemove, disabled }">
        <div class="multiselect-tag">
          {{ option.name }}
          <span
            v-if="!disabled"
            class="multiselect-tag-remove"
            @mousedown.prevent="handleTagRemove(option, $event)"
          >
            <span class="multiselect-tag-remove-icon"></span>
          </span>
        </div>
      </template>
    </Multiselect>
  </div>
</template>

<style scoped>
  .error {
    color: #d32f2f;
  }
  .custom-multiselect {
    --ms-tag-bg: var(--gradient-genres);
    --ms-tag-color: var(--white);
    --ms-tag-radius: var(--radius-xl);
    --ms-border-color: var(--blue-900);
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
  :deep(.custom-multiselect .multiselect-search) {
    color: var(--color-white);
    background-color: var(--surface-color);
  }
  :deep(.custom-multiselect.is-active) {
    border: 1px solid var(--border-color);
    outline: none;
    box-shadow: none;
  }
  :deep(.custom-multiselect .multiselect-dropdown) {
    border: 1px solid var(--border-color);
    outline: none;
    box-shadow: none;
  }
  :deep(.custom-multiselect .multiselect__content) {
    background-color: var(--surface-color);
    color: var(--color-white);
  }
  :deep(.custom-multiselect .multiselect-dropdown) {
    background-color: var(--surface-color);
  }
  :deep(.custom-multiselect .multiselect-option.is-pointed) {
    background-color: var(--purple-400);
    color: var(--text-primary);
  }
</style>
