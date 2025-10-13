<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import Multiselect from '@vueform/multiselect';
  import '@vueform/multiselect/themes/default.css';
  import { getPlatforms, type Platform } from '@/api/platformApi';
  import { useGameFiltersStore } from '@/stores/gameFiltersStore';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';

  const gameFiltersStore = useGameFiltersStore();
  const platforms = ref<Platform[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const platformOptions = computed(() => {
    return platforms.value.map(platform => ({
      id: platform.id,
      name: platform.name,
    }));
  });

  const selectedPlatforms = computed({
    get: () => gameFiltersStore.filters.platforms,
    set: () => {
    }
  });

  const handlePlatformChange = (value: number[]) => {
    const currentPlatforms = gameFiltersStore.filters.platforms;
  
    const added = value.filter(id => !currentPlatforms.includes(id));
    const removed = currentPlatforms.filter(id => !value.includes(id));

    added.forEach(id => gameFiltersStore.togglePlatform(id));
    removed.forEach(id => gameFiltersStore.togglePlatform(id));
  };

  const fetchPlatforms = async () => {
    loading.value = true;
    error.value = null;
  
    try {
      platforms.value = await getPlatforms();
    } catch (e) {
      error.value = 'Failed to load platforms';
      console.error('Error fetching platforms:', e);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchPlatforms();
  });
</script>


<template>
  <div class="platform-filter">
    <app-title class="filter-title">Platforms</app-title>

    <app-loading-spinner 
      v-if="loading" size="80px" 
      borderWidth="6px"
      height="300px" 
    />
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <Multiselect
      v-else
      v-model="selectedPlatforms"
      :options="platformOptions"
      mode="tags"
      :close-on-select="false"
      :searchable="true"
      :create-option="false"
      :filter-results="true"
      :min-chars="0"
      placeholder="Select platforms"
      value-prop="id"
      label="name"
      track-by="name"
      class="custom-multiselect"
      @change="handlePlatformChange"
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
    color: var(--red-500);
  }
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
