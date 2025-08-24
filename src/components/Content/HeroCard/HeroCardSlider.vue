<script setup lang="ts">
  import type { GameResponse } from '@/interface/game.interface';
  import AutoplaySlider from '@/components/Content/Sliders/AutoplaySlider.vue';
  import HeroCard from '@/components/Content/HeroCard/HeroCard.vue';

  interface Props {
    games: GameResponse[];
    detailed?: boolean;
  }
  const props = defineProps<Props>();
</script>

<template>
  <autoplay-slider
    :slides="props.games"
    :options="{ type: 'loop', autoplay: true, interval: 4000 }"
    :getKey="(g: GameResponse) => g.id"
    :show-progress="true"
  >
    <template #default="{ slide }">
      <hero-card :game="slide" :detailed="detailed" />
    </template>
  </autoplay-slider>
</template>
