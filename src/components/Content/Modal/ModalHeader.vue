<script setup lang="ts">
  import AppIcon from '@/components/Base/AppIcon.vue';
  import AppButton from '@/components/Base/AppButton.vue';

  const emit = defineEmits<{
    (e: 'close'): void;
  }>();
</script>

<template>
  <div class="modal-header">
    <app-button @click="emit('close')" class="modal-header__close">
      <app-icon 
        name="cross"
        size="24px"
        color="var(--white)"
      />
    </app-button>
  </div>
</template>

<style scoped>
  .modal-header__close {
    display: flex;
    justify-content: end;
  }
</style>
