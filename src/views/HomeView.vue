<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import HeroCardSlider from '@/components/Content/HeroCard/HeroCardSlider.vue';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';
  import { getPopularGames } from '@/api/popularGames';
  import type { GameResponse } from '@/interface/game.interface';

  const games = ref<GameResponse[]>([]);
  const isLoading = ref(false);

  const fetchPopularGames = async () => {
    isLoading.value = true;

    try {
      const response = await getPopularGames();
      games.value = response;
      console.log('Popular games fetched:', games.value);
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
  <hero-card-slider v-else-if="games.length > 0" :games="games" detailed />
</template>

<style scoped>

</style>
