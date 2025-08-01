<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    primary?: boolean;
    secondary?: boolean;
    ghost?: boolean;
  }>();

  const classes = computed(() => ({
    'button-primary': props.primary,
    'button-secondary': props.secondary,
    'button-ghost': props.ghost,
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
  .button-ghost {
    --backdrop-blur: blur(4px);
    height: var(--space-xl);
    border: 1px solid rgb(255 255 255 / 0.2);
    color: var(--blue-50);
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: var(--backdrop-blur);
    -webkit-backdrop-filter: var(--backdrop-blur);
    transition: border 0.4s ease-in-out, box-shadow 0.4s ease-in-out;
    border-radius: var(--radius-md);
  }
  .button-ghost:hover {
    box-shadow: var(--shadow-xl);
    background-color: rgb(255 255 255 / 0.2);
  }
</style>
