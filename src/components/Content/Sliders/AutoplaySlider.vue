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
    showProgress: true,
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

    const interval = ref<NodeJS.Timeout | null>(null);
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
      interval.value = setInterval(updateProgress, 16);
    };

    const stopProgress = () => {
      if (interval.value) {
        clearInterval(interval.value);
        interval.value = null;
        isRunning = false;
      }
    };

    const resetProgress = () => {
      stopProgress();
      progress = 0;
      progressBar.style.width = '0%';
    };

    const pauseTimeout = ref<NodeJS.Timeout | null>(null);
    const playTimeout = ref<NodeJS.Timeout | null>(null);

    splide.on('autoplay:playing', () => {
      if (pauseTimeout.value) {
        clearTimeout(pauseTimeout.value);
        pauseTimeout.value = null;
      }
      if (playTimeout.value) {
        clearTimeout(playTimeout.value);
      }

      playTimeout.value = setTimeout(() => {
        startProgress();
      }, 10);
    });

    splide.on('autoplay:pause', () => {
      if (playTimeout.value) {
        clearTimeout(playTimeout.value);
        playTimeout.value = null;
      }
      if (pauseTimeout.value) {
        clearTimeout(pauseTimeout.value);
      }

      pauseTimeout.value = setTimeout(() => {
        stopProgress();
      }, 10);
    });

    splide.on('moved', () => {
      resetProgress();
      setTimeout(startProgress, 50);
    });

    setTimeout(startProgress, 100);

    onBeforeUnmount(() => {
      if (interval.value) clearInterval(interval.value);
      if (playTimeout.value) clearTimeout(playTimeout.value);
      if (pauseTimeout.value) clearTimeout(pauseTimeout.value);
    });
  };

  onBeforeUnmount(() => {
    splide?.destroy();
  });
</script>

<template>
  <div ref="splideRoot" class="splide custom-splide">
    <div class="splide__track">
      <ul class="splide__list">
        <li v-for="(slide, index) in props.slides" :key="index" class="splide__slide">
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
