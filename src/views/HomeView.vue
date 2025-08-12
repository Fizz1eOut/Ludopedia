<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import GameCard from '@/components/Content/GameCard/GameCard.vue';
  import { getPopularGames } from '@/api/popularGames';
  import type { GameResponse } from '@/interface/game.interface';


  const popularGames = ref<GameResponse[]>([]);
  const isLoading = ref(false);

  const fetchPopularGames = async () => {
    isLoading.value = true;

    try {
      const response = await getPopularGames();
      popularGames.value = response;
      console.log('Popular games fetched:', popularGames.value);
    } catch (error) {
      console.error('Error fetching popular games:', error);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    fetchPopularGames();
  });
</script>

<template>
  <game-card :popularGames="popularGames" />
</template>

    <style scoped>

    </style>
