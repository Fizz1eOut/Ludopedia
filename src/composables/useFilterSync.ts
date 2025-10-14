import { watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { LocationQueryValue } from 'vue-router';
import { useGameFiltersStore } from '@/stores/gameFiltersStore';

type FilterValue = string | number | number[] | undefined;
type GameFilters = ReturnType<typeof useGameFiltersStore>['filters'];

interface UseFilterSyncOptions<K extends keyof GameFilters> {
  queryParam: string;
  storeFilterKey: K;
  isArray?: boolean;
  defaultValue?: GameFilters[K];
  onChange?: (value: GameFilters[K]) => void;
}

export function useFilterSync<K extends keyof GameFilters>(
  options: UseFilterSyncOptions<K>
) {
  const { 
    queryParam, 
    storeFilterKey, 
    isArray = false, 
    defaultValue,
    onChange 
  } = options;

  const route = useRoute();
  const router = useRouter();
  const gameFiltersStore = useGameFiltersStore();

  const parseQueryValue = (value: LocationQueryValue | LocationQueryValue[]): FilterValue => {
    if (!value) return isArray ? [] : defaultValue;
    
    if (isArray) {
      if (typeof value === 'string') {
        return value.split(',').map(Number).filter(n => !isNaN(n));
      }
      if (Array.isArray(value)) {
        return value.map(v => Number(v)).filter(n => !isNaN(n));
      }
      return [];
    }
    
    if (typeof value === 'string' && !isNaN(Number(value))) {
      return Number(value);
    }
    
    return typeof value === 'string' ? value : defaultValue;
  };

  const serializeValue = (value: FilterValue): string | undefined => {
    if (value === undefined || value === null) return undefined;
    
    if (Array.isArray(value)) {
      return value.length > 0 ? value.join(',') : undefined;
    }
    
    if (typeof value === 'number') {
      return String(value);
    }
    
    if (typeof value === 'string') {
      return value || undefined;
    }
    
    return undefined;
  };

  const setFilterValue = (value: FilterValue) => {
    const filters = gameFiltersStore.filters;
    (filters as unknown as Record<string, FilterValue>)[storeFilterKey as string] = value;
  };

  onMounted(() => {
    const queryValue = route.query[queryParam];
    const parsedValue = parseQueryValue(queryValue);
    
    if (queryValue) {
      setFilterValue(parsedValue);
      if (onChange) onChange(parsedValue as GameFilters[K]);
    } else if (defaultValue !== undefined) {
      setFilterValue(defaultValue as FilterValue);
    }
  });

  watch(
    () => route.query[queryParam],
    (newValue) => {
      const parsedValue = parseQueryValue(newValue);
      const currentValue = gameFiltersStore.filters[storeFilterKey];
      
      const isDifferent = isArray 
        ? JSON.stringify(currentValue) !== JSON.stringify(parsedValue)
        : currentValue !== parsedValue;

      if (isDifferent) {
        setFilterValue(parsedValue);
        gameFiltersStore.fetchGames();
      }
    }
  );

  const updateQuery = async (value: FilterValue) => {
    const serialized = serializeValue(value);
    
    await router.replace({
      query: {
        ...route.query,
        [queryParam]: serialized,
      },
    });
  };

  return {
    updateQuery,
    parseQueryValue,
  };
}
