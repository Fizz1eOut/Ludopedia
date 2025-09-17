<script setup lang="ts">
  import { ref} from 'vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';
  import AppModal from '@/components/Base/AppModal.vue';
  import AppTrailer from '@/components/Base/AppTrailer.vue';
  import type { GameResponse } from '@/interface/game.interface';
  import { useFavoritesStore } from '@/stores/favoritesStore';

  interface GameCardActionsProps {
    game: GameResponse;
  }
  defineProps<GameCardActionsProps>();

  const favoritesStore = useFavoritesStore();
  const isModalOpen = ref(false);

  const openTrailer = () => {
    isModalOpen.value = true;
  };
  const toggleFav = async (itemId: string) => {
    await favoritesStore.toggleFavorite(itemId);
  };
</script>

<template>
  <div class="game-card__actions card-actions">
    <app-button 
      primary 
      class="card-actions__button--trailer"
      @click="openTrailer"
    >
      Watch trailer
    </app-button>
    <app-button 
      secondary 
      class="card-actions__button--favourite"
      @click="toggleFav(game.id.toString())"
    >
      <app-icon 
        :name="favoritesStore.isFavorite(game.id.toString()) ? 'heartfull' : 'heart'"
        size="20px"
        color="var(--white)"
      />
      {{ favoritesStore.isFavorite(game.id.toString()) ? 'Added' : 'Add to favourites' }}
    </app-button>


    <app-modal
      :model-value="isModalOpen"
      @update:model-value="isModalOpen = $event"
    >
      <app-trailer :video-id="game.videos?.[0]?.video_id" />
    </app-modal>
  </div>
</template>

<style scoped>
  .card-actions {
    margin-top: var(--space-xl);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  .card-actions__button--favourite {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }
  @media (max-width: 420px) {
    .card-actions {
      flex-direction: column;
    }
  }
</style>
