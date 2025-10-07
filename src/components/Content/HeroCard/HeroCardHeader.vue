<script setup lang="ts">
  import type { GameResponse } from '@/interface/game.interface';
  import AppTag from '@/components/Base/AppTag.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';

  interface GameCardHeaderProps {
    game: GameResponse;
    detailed?: boolean;
  }
  defineProps<GameCardHeaderProps>();
</script>

<template>
  <div class="game-card__header card-header">
    <app-tag
      v-if="detailed"
      type="badge"
      text="Game of the day"
      icon="cup"
      icon-color="var(--yellow-400)"
      :rating="game.rating"
      class="card-header__tag"
    />
    <app-title class="card-header__title">
      {{ game.name }}
    </app-title>
    <div class="card-header__description">
      {{ game.summary }}
    </div>
  </div>
</template>

<style scoped>
  .card-header__title {
    margin-top: var(--space-md);
    font-size: var(--font-size-3xl);
    color: var(--white);
  }
  .card-header__description {
    color: var(--white);
    margin-top: var(--space-xs);
    font-size: var(--font-size-xl);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    white-space: normal;
  }
  @media (max-width: 480px) {
    .card-header__title {
      font-size: var(--font-size-2xl);
    }
    .card-header__description {
      font-size: var(--font-size-lg);
    }
  }
</style>
