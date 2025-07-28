<script setup lang="ts">
  import AppIcon from '@/components/Base/AppIcon.vue';
</script>

<template>
  <div class="logo">
    <div class="logo__icon">
      <app-icon 
        name="logo" 
        size="var(--space-lg)"
        color="var(--blue-50)"
        class="icon"
      />
    </div>
    <div class="logo__name">Ludopedia</div>
  </div>
</template>

<style scoped>
  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .logo__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 50px;
    padding: 6px 10px;
    background: var(--gradient-logo);
    border-radius: var(--radius-md);
  }
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo__name {
    font-size: var(--font-size-3xl);
    background: var(--gradient-logo);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }
</style>
