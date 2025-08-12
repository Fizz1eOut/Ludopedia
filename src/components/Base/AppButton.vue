<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    primary?: boolean;
    secondary?: boolean;
  }>();

  const classes = computed(() => ({
    'button-primary': props.primary,
    'button-secondary': props.secondary,
  }));
</script>

<template>
  <button
    type="button"
    class="button"
    :class="classes"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
  .button {
    width: 100%;
    height: 100%;
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-regular);
    color: var(--text-primary);
    background-color: transparent;
    cursor: pointer;
    border-radius: 0;
    border: none;
    padding: 0;
    font-family: "Inter", sans-serif;
  }
  .button:hover {
    background-color: transparent
  }

  .button-primary {
    height: var(--space-xl);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-regular);
    color: var(--blue-50);
    background-color: var(--blue-500);
    border-radius: var(--radius-md);
    transition: background-color 0.4s ease-in-out, box-shadow 0.4s ease-in-out, scale 0.4s ease-in-out;
  }
  .button-primary:hover {
    background-color: var(--blue-600);
    box-shadow: var(--shadow-xl);
    scale: 1.02;
  }

  .button-secondary {
    height: var(--space-xl);
    color: var(--blue-50);
    background-color: var(--red-500);
    transition: border 0.4s ease-in-out, box-shadow 0.4s ease-in-out, background-color 0.4s ease-in-out;
    border-radius: var(--radius-md);
  }
  .button-secondary:hover {
    background-color: var(--red-600);
    box-shadow: var(--shadow-xl);
  }
</style>
