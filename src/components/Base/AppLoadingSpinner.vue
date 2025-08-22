<script setup lang="ts">
  import { computed } from 'vue';
  import AppIcon from '@/components/Base/AppIcon.vue';

  interface LoadingSpinnerProps {
    size?: string;
    borderWidth?: string;
    height?: string;
  }
  const props = defineProps<LoadingSpinnerProps>();

  const containerStyle = computed(() => ({
    height: props.height
  }));

  const spinnerStyle = computed(() => ({
    width: props.size,
    height: props.size,
    borderWidth: props.borderWidth,
  }));
</script>

<template>
  <div class="loader" :style="containerStyle">
    <div class="spinner" :style="spinnerStyle">
      <app-icon 
        name="game"
        size="50px"
        color="var(--white)"
      />
    </div>
  </div>
</template>

<style scoped>
  .loader {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .spinner {
    border-radius: 50%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    background: conic-gradient(
      from 0deg,
      #7c3aed,
      #9333ea,
      #c084fc,
      #9333ea,
      #7c3aed
    );
    animation: spin 1.5s linear infinite, gradientShift 3s ease-in-out infinite;
  }

  .icon-placeholder {
    font-size: 2rem;
    color: white;
    background: var(--gradient-logo, linear-gradient(to right, #2563eb, #9333ea));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: pulse 1.8s ease-in-out infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes gradientShift {
    0% {
      filter: hue-rotate(0deg);
    }
    100% {
      filter: hue-rotate(360deg);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.15);
      opacity: 0.8;
    }
  }
</style>
