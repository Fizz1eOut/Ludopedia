<script setup lang="ts">
  import { computed } from 'vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';

  const props = defineProps<{
    modelValue: boolean
    side?: 'left' | 'right'
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
  }>();

  const isOpen = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  });
</script>

<template>
  <Transition name="slide">
    <div 
      v-if="isOpen" 
      class="sidebar"
      :class="`sidebar--${side ?? 'right'}`"
    >
      <app-container>
        <div class="sidebar__header">
          <app-title>
            <slot name="title" />
          </app-title>
          <app-button @click="isOpen = false" class="sidebar__btn">
            <app-icon 
              name="cross"
              size="20px"
              color="var(--text-primary)"
            />
          </app-button>
        </div>
        <div class="sidebar__body">
          <slot />
        </div>
      </app-container>
    </div>
  </Transition>
</template>

<style scoped>
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }
  .sidebar {
    position: fixed;
    top: 0;
    max-width: 320px;
    width: 100%;
    height: 100vh;
    display: block;
    background-color: var(--surface-color);
    border-radius: var(--radius-sm);
    z-index: 10;
    box-shadow: var(--shadow-lg);
  }
  .sidebar :deep(.container) {
    max-width: none !important;
    margin: 0 !important;
    height: 100% !important;
    display: flex !important;
    flex-direction: column !important;
  }
  .sidebar__body {
   height: 100%;
  }
  .sidebar__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 20px;
  }
  .sidebar__btn {
    max-width: 20px;
    width: 100%;
  }
  .sidebar__icon {
    padding: 5px;
  }
  .sidebar--right {
    right: 0;
  }
  .sidebar--left {
    left: 0;
  }
  .sidebar__body {
    margin-top: var(--space-md);
  }

  .slide-enter-from .sidebar--right,
  .slide-leave-to .sidebar--right {
    transform: translateX(100%);
  }
  .slide-enter-from .sidebar--left,
  .slide-leave-to .sidebar--left {
    transform: translateX(-100%);
  }
</style>
