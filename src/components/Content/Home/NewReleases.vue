<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';
  import AppGameCard from '@/components/Base/AppGameCard.vue';
  import BaseSlider from '@/components/Content/Sliders/BaseSlider.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import { getFilteredGames } from '@/api/gamesApi';
  import type { GameResponse } from '@/interface/game.interface';

  const isLoading = ref(false);
  const games = ref<GameResponse[]>([]);

  const fetchPopularGames = async() => {
    isLoading.value = true;
    try {
      const now = Math.floor(Date.now() / 1000);
      const oneMonthAgo = now - 30 * 24 * 60 * 60;

      const response = await getFilteredGames({
        dateFrom: oneMonthAgo,
        dateTo: now,
        sort: 'first_release_date desc',
        limit: 10,
      });

      games.value = response;
      console.log('New releases fetched:', games.value);
    } catch (error) {
      console.error('Error fetching New releases games:', error);
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
  <div v-else-if="games.length > 0">
    <app-title class="releases-title">New Releases</app-title>
    <base-slider :slides="games" :options="{ perPage: 4, gap: '10px' }">
      <template #default="{ slide }">
        <app-game-card :game="slide" />
      </template>
    </base-slider>
  </div>
</template>

<style scoped>
  .releases-title {
    margin-top: var(--space-xl);
    margin-bottom: var(--space-md);
  }
</style>
