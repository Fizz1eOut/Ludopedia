<script setup lang="ts" generic="T">
  import { onMounted, onBeforeUnmount, ref } from 'vue';
  import Splide from '@splidejs/splide';
  import type { Options as SplideOptions } from '@splidejs/splide';
  import '@splidejs/splide/css';

  interface Props {
    slides: T[];
    options?: SplideOptions;
  }

  const props = withDefaults(defineProps<Props>(), {
    options: () => ({}),
  });

  const splideRoot = ref<HTMLDivElement | null>(null);
  let splide: Splide | null = null;

  onMounted(() => {
    if (splideRoot.value) {
      splide = new Splide(splideRoot.value, {
        type: 'loop',
        autoplay: false,
        arrows: false,
        pagination: true,
        ...props.options,
        breakpoints: {
          1024: { perPage: 3, gap: '10px' },
          768: { perPage: 2, gap: '10px' },
          500: { perPage: 1, gap: '10px' }
        }
      });

      splide.mount();
    }
  });

  onBeforeUnmount(() => {
    splide?.destroy();
  });
</script>

<template>
  <div ref="splideRoot" class="splide custom-slide">
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
  </div>
</template>

<style>
  .custom-slide .splide__pagination {
    bottom: -20px;
  }
  .custom-slide .splide__slide {
    display: flex;
    height: auto;
  }
</style>
