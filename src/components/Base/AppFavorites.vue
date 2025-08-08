<script setup lang="ts">
  import AppIcon from '@/components/Base/AppIcon.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
</script>

<template>
  <app-underlay>
    <div class="favorites">
      <app-icon
        name="favorite"
        size="30px"
        color="var(--text-primary)"
      />
    </div>
  </app-underlay>
</template>

<style scoped>
  .favorites {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 42px;
    height: 46px;
  }
</style>
