<script setup lang="ts">
  import HeroCardGenres from '@/components/Content/HeroCard/HeroCardGenres.vue';
  import HeroCardPlatforms from '@/components/Content/HeroCard/HeroCardPlatforms.vue';
  import HeroCardModes from '@/components/Content/HeroCard/HeroCardModes.vue';
  import HeroCardMakers from '@/components/Content/HeroCard/HeroCardMakers.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import type { GameResponse } from '@/interface/game.interface';

  interface DetailsGameMetaProps {
    game: GameResponse
  }
  defineProps<DetailsGameMetaProps>();
</script>

<template>
  <div class="details-game-meta">
    <app-underlay>
      <app-container>
        <hero-card-genres :game="game" />
      </app-container>
    </app-underlay>

    <app-underlay>
      <app-container>
        <hero-card-platforms :game="game" />
      </app-container>
    </app-underlay>

    <app-underlay>
      <app-container>
        <hero-card-modes :game="game" />
      </app-container>
    </app-underlay>

    <hero-card-makers :game="game" />
  </div>
</template>

<style scoped>
  .details-game-meta {
    margin-top: var(--space-xl)
  }
  .details-game-meta > *:not(:last-child) {
    margin-bottom: var(--space-md);
  }
  :deep(.app-tag) {
    font-size: var(--font-size-sm);
    padding: 8px 12px;
  }
</style>
