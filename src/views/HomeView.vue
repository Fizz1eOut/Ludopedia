<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import GameCard from '@/components/Content/HeroCard/HeroCard.vue';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';
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
  <app-loading-spinner 
    v-if="isLoading" size="80px" 
    borderWidth="6px"
    height="300px" 
  />
  <game-card v-else :popularGames="popularGames" detailed />
</template>

<style scoped>

</style>
