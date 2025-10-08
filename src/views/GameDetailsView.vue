<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue';
  import HeroCard from '@/components/Content/HeroCard/HeroCard.vue';
  import ReviewBlock from '@/components/Content/Review/ReviewBlock.vue';
  import { getGameById } from '@/api/gameById';
  import type { GameResponse } from '@/interface/game.interface';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const game = ref<GameResponse | null>(null);

  const fetchGameDetails = async (id: number) => {
    try {
      const response = await getGameById(id);
      game.value = response;
      console.log('Game details fetched:', response);
    } catch (error) {
      console.error('Error fetching game details:', error);
    }
  };
  onMounted(() => {
    fetchGameDetails(Number(route.params.id));
  });

  watch(
    () => route.params.id,
    (newId) => {
      fetchGameDetails(Number(newId));
    }
  );
</script>

<template>
  <div v-if="game">
    <hero-card :game="game" :detailed="false" />
    <review-block :game-id="String(game.id)" />
  </div>
</template>

<style scoped>

</style>
