<script setup lang="ts">
  import { ref } from 'vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppModal from '@/components/Base/AppModal.vue';
  import FavoritesClearModal from '@/components/Content/Favorites/FavoritesClearModal.vue';
  import { useFavoritesStore } from '@/stores/favoritesStore';

  const favoritesStore = useFavoritesStore();
  const isModalOpen = ref(false);
</script>

<template>
  <div v-if="favoritesStore.favoriteGames.length > 0" class="favorites-remove__button">
    <app-button secondary @click="isModalOpen = true">
      Clear Favorites
    </app-button>
  </div>
  <app-modal
    :model-value="isModalOpen"
    @update:model-value="isModalOpen = $event"
  >
    <favorites-clear-modal @close="isModalOpen = false" @clear="favoritesStore.clearFavorites" />
  </app-modal>  
</template>

<style scoped>
  .favorites-remove__button {
    min-width: 200px;
  }
  @media (max-width: 480px) {
    .favorites-remove__button {
      min-width: 150px;
    }
  }
    @media (max-width: 360px) {
    .favorites-remove__button {
      width: 100%;
    }
  }
</style>
