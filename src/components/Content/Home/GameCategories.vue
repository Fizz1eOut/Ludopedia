<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';
  import AppGameCard from '@/components/Base/AppGameCard.vue';
  import BaseSlider from '@/components/Content/Sliders/BaseSlider.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppLink from '@/components/Base/AppLink.vue';
  import { getFilteredGames } from '@/api/gamesApi';
  import type { GameResponse } from '@/interface/game.interface';

  const isLoading = ref(true);
  const topRPG = ref<GameResponse[]>([]);
  const topAction = ref<GameResponse[]>([]);
  const topRacing = ref<GameResponse[]>([]);

  const fetchTopGames = async () => {
    isLoading.value = true;
    try {
      const [rpg, action, racing] = await Promise.all([
        getFilteredGames({
          genres: [12],
          sort: 'rating desc',
          limit: 10,
          minRating: 70,
        }),
        getFilteredGames({
          genres: [4],
          sort: 'rating desc',
          limit: 10,
          minRating: 70,
        }),
        getFilteredGames({
          genres: [10],
          sort: 'rating desc',
          limit: 10,
          minRating: 70,
        }),
      ]);

      topRPG.value = rpg;
      topAction.value = action;
      topRacing.value = racing;

      console.log('Fetched top RPG:', rpg);
      console.log('Fetched top Action:', action);
      console.log('Fetched top Racing:', racing);
    } catch (error) {
      console.error('Error fetching top games:', error);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetchTopGames);
</script>

<template>
  <div class="game-categories">
    <app-loading-spinner 
      v-if="isLoading" size="80px" 
      borderWidth="6px"
      height="300px" 
    />
    <div v-else class="game-categories__items">
      <div class="game-categories__item">
        <div class="game-categories__row">
          <app-title>Top RPG Games</app-title>
          <router-link to="/games">
            <app-link>View All</app-link>
          </router-link>
        </div>
        <BaseSlider :slides="topRPG" :options="{ perPage: 4, gap: '10px' }">
          <template #default="{ slide }">
            <app-game-card :game="slide" />
          </template>
        </BaseSlider>
      </div>

      <div class="game-categories__item">
        <div class="game-categories__row">
          <app-title>Top Action Games</app-title>
          <router-link to="/games">
            <app-link>View All</app-link>
          </router-link>
        </div>
        <BaseSlider :slides="topAction" :options="{ perPage: 4, gap: '10px' }">
          <template #default="{ slide }">
            <app-game-card :game="slide" />
          </template>
        </BaseSlider>
      </div>

      <div class="game-categories__item">
        <div class="game-categories__row">
          <app-title>Top  Racing Games</app-title>
          <router-link to="/games">
            <app-link>View All</app-link>
          </router-link>
        </div>
        <BaseSlider :slides="topRacing" :options="{ perPage: 4, gap: '10px' }">
          <template #default="{ slide }">
            <app-game-card :game="slide" />
          </template>
        </BaseSlider>
      </div>
    </div>
  </div>
</template>

<style scoped>
 .game-categories__items > *:not(:last-child) {
    margin-top: var(--space-xl);
    margin-bottom: var(--space-xl);
  }
  .game-categories__row {
    margin-bottom: var(--space-md);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
</style>
