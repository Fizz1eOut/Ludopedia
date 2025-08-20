<script setup lang="ts">
  import { computed } from 'vue';
  import type { GameResponse } from '@/interface/game.interface';
  import AppTag from '@/components/Base/AppTag.vue';

  interface GameCardMetaProps {
    game: GameResponse;
  }
  const props = defineProps<GameCardMetaProps>();

  const releaseDate = computed(() => {
    return props.game.first_release_date
      ? new Date(props.game.first_release_date * 1000).toLocaleDateString()
      : 'N/A';
  });
</script>

<template>
  <div class="game-card__stats card-stats">
    <app-tag
      type="chip"
      :text="releaseDate"
      icon="date"
      icon-color="var(--green-400)"
      class="card-stats__tag"
    />
    <app-tag
      type="chip"
      text="Players:"
      icon="people"
      icon-color="var(--blue-400)"
      :rating="game.rating"
      class="card-stats__tag"
    />
    <app-tag
      type="chip"
      text="Critics:"
      icon="cup"
      icon-color="var(--purple-500)"
      :rating="game.aggregated_rating || 'N/A'"
      class="card-stats__tag"
    />
  </div>
</template>

<style scoped>
  .card-stats {
    margin-top: var(--space-md);
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
</style>
