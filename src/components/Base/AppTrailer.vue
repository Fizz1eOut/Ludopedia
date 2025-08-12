<script setup lang="ts">
  import AppTitle from '@/components/Base/AppTitle.vue';

  interface ModalTrailerProps {
    videoId?: string;
  }
  defineProps<ModalTrailerProps>();
</script>

<template>
  <div class="trailer-modal">
    <iframe
      v-if="videoId"
      :src="`https://www.youtube.com/embed/${videoId}`"
      frameborder="0"
      allowfullscreen
      class="trailer"
    />
    <app-title class="trailer-modal__error" v-else>Trailer not available</app-title>
  </div>
</template>

<style scoped>
  .trailer {
    width: 100%;
    min-height: 320px;
    border-radius: var(--radius-md);
  }
  .trailer-modal__error {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;;
  }
</style>
