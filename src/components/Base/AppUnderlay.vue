<script setup lang="ts">
  import { computed } from 'vue';

  const props = withDefaults(
    defineProps<{
      radius?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    }>(),
    {
      radius: 'sm',
    }
  );

  const borderRadiusClass = computed(() => `radius-${props.radius}`);
</script>

<template>
  <div :class="borderRadiusClass" class="underlay">
    <slot />
  </div>
</template>

<style scoped>
  .underlay {
    background-color: var(--surface-color);
  }
  .radius-sm {
    border-radius: var(--radius-sm);
  }
  .radius-md {
    border-radius: var(--radius-md);
  }
  .radius-lg {
    border-radius: var(--radius-lg);
  }
  .radius-xl {
    border-radius: var(--radius-xl);
  }
  .radius-full {
    border-radius: var(--radius-full);
  }
</style>
