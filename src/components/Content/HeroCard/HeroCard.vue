<script setup lang="ts">
  import type { GameResponse } from '@/interface/game.interface';
  import AppImage from '@/components/Base/AppImage.vue';
  import HeroCardHeader from '@/components/Content/HeroCard/HeroCardHeader.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import HeroCardStats from '@/components/Content/HeroCard/HeroCardStats.vue';
  import HeroCardGenres from '@/components/Content/HeroCard/HeroCardGenres.vue';
  import HeroCardActions from '@/components/Content/HeroCard/HeroCardActions.vue';
  import HeroCardPlatforms from '@/components/Content/HeroCard/HeroCardPlatforms.vue';
  import HeroCardModes from '@/components/Content/HeroCard/HeroCardModes.vue';
  import HeroCardMakers from '@/components/Content/HeroCard/HeroCardMakers.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import { useRouter } from 'vue-router';

  interface HeroCardProps {
    game: GameResponse;
    detailed?: boolean;
  }
  defineProps<HeroCardProps>();

  const router = useRouter();
  const goToGameDetails = (id: number) => {
    router.push({ name: 'game', params: { id } });
  };
</script>

<template>
  <div class="hero-card">
    <app-image 
      :url="game?.cover?.url" 
      size="t_original"
      class="hero-card__bg"
    />

    <div class="hero-card__body">
      <app-container size="sm">
        <div class="hero-card__items">
          <div class="hero-card__content">
            <hero-card-header :game="game" :detailed="detailed" />
            <hero-card-stats :game="game" />
            <hero-card-actions :game="game" />
            <app-button 
              v-if="detailed"
              gradient 
              @click="goToGameDetails(game.id)"  
              class="hero-card__details"
            >View details</app-button>
          </div>
          <div class="hero-card__meta">
            <hero-card-genres :game="game" />
            <hero-card-platforms :game="game" />
            <hero-card-modes :game="game" />
            <hero-card-makers :game="game" />
          </div>
        </div>
      </app-container>
    </div>
  </div>
</template>

<style scoped>
  .hero-card {
    margin-top: var(--space-sm);
    position: relative;
    height: 600px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-xl);
  }
  .hero-card__bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background-size: cover;
    background-position: center;
    border-radius: var(--radius-xl);
  }
  .hero-card__bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(10 10 10 / 30%);
    z-index: 1;
  }
  .hero-card__body {
    position: relative;
    z-index: 1;
    width: 100%;
  }
  .hero-card__items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }
  .hero-card__content,
  .hero-card__meta {
    flex: 0 1 50%;
  }
  .hero-card__meta {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .hero-card__details {
    margin-top: var(--space-xs);
  }
  @media (max-width: 841px) {
    .hero-card__items {
      flex-direction: column;
    }
    .hero-card__meta {
      display: none;
    }
  }
</style>
