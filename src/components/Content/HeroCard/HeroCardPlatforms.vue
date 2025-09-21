<script setup lang="ts">
  import AppTag from '@/components/Base/AppTag.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import type { GameResponse } from '@/interface/game.interface';

  interface GameCardPlatformProps {
    game: GameResponse;
  }
  defineProps<GameCardPlatformProps>();
</script>

<template>
  <div class="game-card__platforms card-platforms">
    <div class="card-platforms__header">
      <app-icon 
        name="monitor"
        size="25px"
        color="var(--green-400)"
      />
      <app-title class="card-platforms__title">
        Platforms
      </app-title>
    </div>
    
    <div class="card-platforms__content">
      <app-tag 
        v-for="platform in game.platforms"
        :key="platform.id"
        type="success"
        :text="platform.name"
      />
    </div>
  </div>
</template>

<style scoped>
  .card-platforms__title {
    color: var(--white);
  }
  .card-platforms__header {
   display: flex;
   align-items: center;
   gap: 10px;
  }
  .card-platforms__content {
    margin-top: var(--space-sm);
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
</style>
