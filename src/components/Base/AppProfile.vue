<script setup lang="ts">
  import AppIcon from '@/components/Base/AppIcon.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
</script>

<template>
  <app-underlay>
    <div class="profile">
      <app-icon
        name="profile"
        size="30px"
        color="var(--text-primary)"
        class="profile__icon"
      />
    </div>
  </app-underlay>
</template>

<style scoped>
  .profile {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 42px;
    height: 46px;
  }
</style>
