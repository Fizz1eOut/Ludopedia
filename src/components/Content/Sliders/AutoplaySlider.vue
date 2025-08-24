<script setup lang="ts" generic="T">
  import { onMounted, onBeforeUnmount, ref } from 'vue';
  import Splide from '@splidejs/splide';
  import type { Options as SplideOptions } from '@splidejs/splide';
  import '@splidejs/splide/css';

  interface Props {
    slides: T[];
    options?: SplideOptions;
    showProgress?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    showProgress: true
  });

  const splideRoot = ref<HTMLDivElement | null>(null);
  let splide: Splide | null = null;

  onMounted(() => {
    if (splideRoot.value) {
      splide = new Splide(splideRoot.value, {
        type: 'loop',
        autoplay: true,
        interval: 3000,
        pauseOnHover: true,
        arrows: false,
        pagination: true,
        ...(props.showProgress && {
          autoplay: true,
          interval: 3000,
        }),
        ...props.options,
      });

      splide.mount();

      if (props.showProgress) {
        setupCustomProgressBar();
      }
    }
  });

  const setupCustomProgressBar = () => {
    if (!splide) return;

    const progressBar = splideRoot.value?.querySelector('.splide__progress__bar') as HTMLElement;
    if (!progressBar) return;

    let interval: number | null = null;
    let progress = 0;
    let isRunning = false;
    const duration = splide.options.interval || 3000;
    const step = 100 / (duration / 16);

    const updateProgress = () => {
      progress += step;
      if (progress >= 100) {
        progress = 0;
      }
      progressBar.style.width = `${progress}%`;
    };

    const startProgress = () => {
      if (isRunning) return;
      
      progress = 0;
      progressBar.style.width = '0%';
      isRunning = true;
      interval = setInterval(updateProgress, 16);
    };

    const stopProgress = () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
        isRunning = false;
      }
    };

    const resetProgress = () => {
      stopProgress();
      progress = 0;
      progressBar.style.width = '0%';
    };

    let pauseTimeout: number | null = null;
    let playTimeout: number | null = null;

    splide.on('autoplay:playing', () => {
      if (pauseTimeout) {
        clearTimeout(pauseTimeout);
        pauseTimeout = null;
      }
      if (playTimeout) {
        clearTimeout(playTimeout);
      }

      playTimeout = setTimeout(() => {
        startProgress();
      }, 10);
    });

    splide.on('autoplay:pause', () => {
      if (playTimeout) {
        clearTimeout(playTimeout);
        playTimeout = null;
      }
      if (pauseTimeout) {
        clearTimeout(pauseTimeout);
      }

      pauseTimeout = setTimeout(() => {
        stopProgress();
      }, 10);
    });

    splide.on('moved', () => {
      resetProgress();
      setTimeout(startProgress, 50);
    });

    setTimeout(startProgress, 100);
  };

  onBeforeUnmount(() => {
    splide?.destroy();
  });
</script>

<template>
  <div ref="splideRoot" class="splide custom-splide">
    <div class="splide__track">
      <ul class="splide__list">
        <li
          v-for="(slide, index) in props.slides"
          :key="index"
          class="splide__slide"
        >
          <slot :slide="slide" />
        </li>
      </ul>
    </div>
    
    <div v-if="showProgress" class="splide__progress">
      <div class="splide__progress__bar"></div>
    </div>
  </div>
</template>

<style>
  .splide__pagination__page {
    background-color: var(--blue-400);
  }
  .splide__pagination__page.is-active {
    background-color: var(--blue-700);
  }
  .splide__progress {
    height: 4px;
  }
  .splide__progress__bar {
    background: var(--gradient-logo);
    border-radius: 2px;
    box-shadow: var(--shadow-2xl);
    height: 100%;
    width: 0%;
    transition: none;
  }
</style>
