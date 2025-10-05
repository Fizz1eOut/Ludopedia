<script setup lang="ts">
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';
</script>

<template>
  <div class="favorites-clear-modal">
    <div class="favorites-clear-modal__header">
      <app-title>
        Clear favorites
      </app-title>
      <app-button class="auth-form__close" @click="$emit('close')">
        <app-icon
          name="cross"
          size="20px"
          style="color: var(--white)"
        />
      </app-button>
    </div>

    <div class="favorites-clear-modal__content">
      <p class="favorites-clear-modal__text">
        Are you sure you want to clear your entire list of favorite games?
      </p>
      <div class="favorites-clear-modal__actions">
        <app-button primary @click="$emit('close')">
          No, keep my favorites
        </app-button>
        <app-button secondary @click="$emit('clear')">
          Yes, clear favorites
        </app-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .favorites-clear-modal__header {
    margin-bottom: var(--space-md);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  .auth-form__close {
    width: 30px;
    height: 30px;
  }
  .favorites-clear-modal__text {
    font-size: var(--font-size-lg);
    color: var(--text-primary);
    margin-bottom: var(--space-md);
  }
  .favorites-clear-modal__actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  @media (max-width: 380px) {
    :deep(.button) {
      font-size: var(--font-size-sm);
    }
  }
</style>
