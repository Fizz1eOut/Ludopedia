<script setup lang="ts">
  import { ref} from 'vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppFavoriteButton from '@/components/Base/AppFavoriteButton.vue';
  import AppModal from '@/components/Base/AppModal.vue';
  import AppTrailer from '@/components/Base/AppTrailer.vue';
  import type { GameResponse } from '@/interface/game.interface';

  interface GameCardActionsProps {
    game: GameResponse;
  }
  defineProps<GameCardActionsProps>();

  const isModalOpen = ref(false);

  const openTrailer = () => {
    isModalOpen.value = true;
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

    <app-favorite-button :game="game" class="card-actions__button--favorites" />

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
  .card-actions__button--trailer,
  .card-actions__button--favorites {
    flex: 0 1 50%;
  }
  @media (max-width: 420px) {
    .card-actions {
      flex-direction: column;
    }
    .card-actions__button--trailer,
    .card-actions__button--favorites {
      flex: none;
      width: 100%;
    }
  }
</style>
