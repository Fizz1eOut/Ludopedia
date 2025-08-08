import { ref, onMounted, onBeforeUnmount } from 'vue';

export const useMediaQuery = (query: string) => {
  const isMobile = ref(false);
  let mediaQueryList: MediaQueryList | null = null;

  const handleMediaChange = (event: MediaQueryListEvent) => {
    isMobile.value = event.matches;
  };

  onMounted(() => {
    mediaQueryList = window.matchMedia(query);
    isMobile.value = mediaQueryList.matches;
    mediaQueryList.addEventListener('change', handleMediaChange);
  });

  onBeforeUnmount(() => {
    if (mediaQueryList) {
      mediaQueryList.removeEventListener('change', handleMediaChange);
    }
  });

  return {
    isMobile
  };
};
