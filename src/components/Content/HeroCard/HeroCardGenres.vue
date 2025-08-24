<script setup lang="ts">
  import AppTag from '@/components/Base/AppTag.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import type { GameResponse } from '@/interface/game.interface';

  interface GameCardGenresProps {
    game: GameResponse;
  }
  defineProps<GameCardGenresProps>();
</script>

<template>
  <div class="game-card__genres card-genres">
    <div class="card-genres__header">
      <app-icon 
        name="game"
        size="25px"
        color="var(--blue-400)"
      />
      <app-title class="card-genres__title" level="4">
        Genres
      </app-title>
    </div>

    <div class="card-genres__content">
      <app-tag 
        v-for="genre in game.genres"
        :key="genre.id"
        type="badge"
        :text="genre.name"
      />
    </div>
  </div>
</template>

<style scoped>
  .card-genres__title {
    color: var(--white);
  }
  .card-genres__header {
   display: flex;
   align-items: center;
   gap: 10px;
  }
  .card-genres__content {
    margin-top: var(--space-sm);
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
</style>
