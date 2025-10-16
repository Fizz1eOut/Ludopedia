import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import type { GameResponse } from '@/interface/game.interface';
import { getFilteredGames } from '@/api/gamesApi';
import { useRoute, useRouter } from 'vue-router';

interface GameFilters {
  genres: number[];
  platforms: number[];
  sort: string;
  dateFrom?: number;
  dateTo?: number;
  minRating?: number;
}

export const useGameFiltersStore = defineStore('gameFilters', () => {
  const route = useRoute();
  const router = useRouter();

  const games = ref<GameResponse[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const filters = ref<GameFilters>({
    genres: [],
    platforms: [],
    sort: 'rating desc',
  });

  const page = ref<number>(Number(route.query.page) || 1);
  const limit = 20;

  // Когда меняется страница в query → обновляем store
  watch(
    () => route.query.page,
    (newPage) => {
      page.value = Number(newPage) || 1;
      fetchGames();
    }
  );

  const hasActiveFilters = computed(() => {
    return (
      filters.value.genres.length > 0 ||
      filters.value.platforms.length > 0 ||
      filters.value.dateFrom !== undefined ||
      filters.value.dateTo !== undefined ||
      filters.value.minRating !== undefined
    );
  });

  const activeFiltersCount = computed(() => {
    return filters.value.genres.length + filters.value.platforms.length;
  });

  const fetchGames = async () => {
    loading.value = true;
    error.value = null;

    try {
      const offset = (page.value - 1) * limit;

      const result = await getFilteredGames({
        genres: filters.value.genres.length ? filters.value.genres : undefined,
        platforms: filters.value.platforms.length ? filters.value.platforms : undefined,
        sort: filters.value.sort,
        dateFrom: filters.value.dateFrom,
        dateTo: filters.value.dateTo,
        minRating: filters.value.minRating,
        limit,
        offset,
      });

      games.value = result;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Ошибка загрузки игр';
      console.error('Error fetching games:', e);
    } finally {
      loading.value = false;
    }
  };

  const goToPage = async (newPage: number) => {
    if (newPage < 1) return;
    await router.replace({
      query: { ...route.query, page: newPage },
    });
  };

  const nextPage = () => goToPage(page.value + 1);
  const prevPage = () => goToPage(page.value - 1);

  const toggleGenre = (genreId: number) => {
    const index = filters.value.genres.indexOf(genreId);
    if (index === -1) filters.value.genres.push(genreId);
    else filters.value.genres.splice(index, 1);
    page.value = 1;
    fetchGames();
  };

  const togglePlatform = (platformId: number) => {
    const index = filters.value.platforms.indexOf(platformId);
    if (index === -1) filters.value.platforms.push(platformId);
    else filters.value.platforms.splice(index, 1);
    page.value = 1;
    fetchGames();
  };

  const clearFilters = () => {
    filters.value.genres = [];
    filters.value.platforms = [];
    filters.value.sort = 'rating desc';
    filters.value.dateFrom = undefined;
    filters.value.dateTo = undefined;
    filters.value.minRating = undefined;
    page.value = 1;
    fetchGames();
  };

  return {
    games,
    loading,
    error,
    filters,
    page,
    limit,
    hasActiveFilters,
    activeFiltersCount,
    fetchGames,
    nextPage,
    prevPage,
    goToPage,
    toggleGenre,
    togglePlatform,
    clearFilters,
  };
});
