<script setup lang="ts">
  import { ref, computed, watch } from 'vue';

  interface AppImageProps {
    url?: string;
    size?: string;
  }

  const props = defineProps<AppImageProps>();
  const hasError = ref(false);

  const imageUrl = computed(() => {
    if (!props.url) return;

    const size = props.size || 't_1080p';

    let cleanUrl = props.url.replace(/^https?:/, '');

    cleanUrl = cleanUrl.replace(/\/t_[^/]+\//, `/${size}/`);

    return `https:${cleanUrl}`;
  });

  watch(() => props.url, () => {
    hasError.value = false;
  });
</script>

<template>
  <div class="image-wrapper">
    <img
      v-if="imageUrl && !hasError"
      class="image"
      :src="imageUrl"
      alt="Game cover"
      @error="hasError = true"
    >
    <img
      v-else
      class="image"
      src="https://placehold.co/1920x1080?text=No+Image"
      alt="Image not available"
    >
  </div>
</template>

<style scoped>
.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-sm);
}
</style>
