<script setup lang="ts">
  import AppTag from '@/components/Base/AppTag.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import type { GameResponse } from '@/interface/game.interface';

  interface GameCardModesProps {
    game: GameResponse;
  }
  defineProps<GameCardModesProps>();
</script>

<template>
  <div class="game-card__modes card-modes">
    <div class="card-modes__header">
      <app-icon 
        name="joystick"
        size="25px"
        color="var(--yellow-400)"
      />
      <app-title>
        Modes
      </app-title>
    </div>

    <div class="card-modes__content">
      <app-tag 
        v-for="modes in game.game_modes"
        :key="modes.id"
        type="feature"
        :text="modes.name"
        class="card-modes__tag"
      />
    </div>
  </div>
</template>

<style scoped>
  .card-modes__header {
   display: flex;
   align-items: center;
   gap: 10px;
  }
  .card-modes__content {
    margin-top: var(--space-sm);
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
</style>
