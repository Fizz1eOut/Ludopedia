import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { GameResponse } from '@/interface/game.interface';
import { getFilteredGames } from '@/api/gamesApi';

interface GameFilters {
  genres: number[];
  platforms: number[];
  sort: string;
  dateFrom?: number;
  dateTo?: number;
  minRating?: number;
}

export const useGameFiltersStore = defineStore('gameFilters', () => {
  const games = ref<GameResponse[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  
  const filters = ref<GameFilters>({
    genres: [],
    platforms: [],
    sort: 'rating desc',
  });

  const hasActiveFilters = computed(() => {
    return filters.value.genres.length > 0 || 
           filters.value.platforms.length > 0 ||
           filters.value.dateFrom !== undefined ||
           filters.value.dateTo !== undefined ||
           filters.value.minRating !== undefined;
  });

  const activeFiltersCount = computed(() => {
    return filters.value.genres.length + filters.value.platforms.length;
  });

  const fetchGames = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      const result = await getFilteredGames({
        genres: filters.value.genres.length ? filters.value.genres : undefined,
        platforms: filters.value.platforms.length ? filters.value.platforms : undefined,
        sort: filters.value.sort,
        dateFrom: filters.value.dateFrom,
        dateTo: filters.value.dateTo,
        minRating: filters.value.minRating,
      });
      
      games.value = result;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Ошибка загрузки игр';
      console.error('Error fetching games:', e);
    } finally {
      loading.value = false;
    }
  };

  const toggleGenre = (genreId: number) => {
    const index = filters.value.genres.indexOf(genreId);
    if (index === -1) {
      filters.value.genres.push(genreId);
    } else {
      filters.value.genres.splice(index, 1);
    }
    fetchGames();
  };

  const togglePlatform = (platformId: number) => {
    const index = filters.value.platforms.indexOf(platformId);
    if (index === -1) {
      filters.value.platforms.push(platformId);
    } else {
      filters.value.platforms.splice(index, 1);
    }
    fetchGames();
  };

  const clearFilters = () => {
    filters.value.genres = [];
    filters.value.platforms = [];
    filters.value.sort = 'rating desc';
    filters.value.dateFrom = undefined;
    filters.value.dateTo = undefined;
    filters.value.minRating = undefined;
    fetchGames();
  };

  const isGenreActive = (genreId: number): boolean => {
    return filters.value.genres.includes(genreId);
  };

  const isPlatformActive = (platformId: number): boolean => {
    return filters.value.platforms.includes(platformId);
  };

  return {
    games,
    loading,
    error,
    filters,

    hasActiveFilters,
    activeFiltersCount,
  
    fetchGames,
    toggleGenre,
    togglePlatform,
    clearFilters,
    isGenreActive,
    isPlatformActive,
  };
});
