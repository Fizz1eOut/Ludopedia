<script setup lang="ts">
  import AppImage from '@/components/Base/AppImage.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import type { GameScreenshots } from '@/interface/game.interface';

  interface DetailsGameScreenshotsProps {
    screenshots?: GameScreenshots[]
    size?: string
  }
  defineProps<DetailsGameScreenshotsProps>();
</script>

<template>
  <div class="screenshots">
    <app-title>Screenshots</app-title>
    <div v-if="screenshots && screenshots.length" class="screenshots__body">
      <ul class="screenshots__list">
        <li
          v-for="screenshot in screenshots"
          :key="screenshot.id"
          class="screenshot__item"
        >
          <app-image :url="screenshot.url" :size="size || 't_720p'" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  .screenshots {
    margin-top: var(--space-xl);
  }
  .screenshots__body {
    margin-top: var(--space-md);
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: var(--space-sm);
  }
  .screenshots__list {
    display: flex;
    flex-wrap: nowrap;
    gap: 20px;
  }
  .screenshot__item {
    flex: 0 0 auto;
    width: 500px;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }
  .screenshot__item:hover {
    transform: scale(1.2);
    box-shadow: var(--shadow-sm);
  }
  .screenshots__body::-webkit-scrollbar {
    height: 6px;
  }
  .screenshots__body::-webkit-scrollbar-thumb {
    background: var(--surface-color);
    border-radius: 3px;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    .screenshot__item {
      width: 320px;
    }
  }
  @media (max-width: 440px) {
  .screenshot__item {
      width: 280px;
    }
  }
</style>
