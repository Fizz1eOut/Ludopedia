<script setup lang="ts">
  import { useAuthStore } from '@/stores/authStore';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';

  const emit = defineEmits<{
    (e: 'logoutSuccess'): void;
  }>();

  const authStore = useAuthStore();

  const handleLogout = async () => {
    await authStore.signOut();
    emit('logoutSuccess');
  };
</script>

<template>
  <app-button 
    @click="handleLogout" 
    secondary
    class="logout-btn"
  >
    <app-icon 
      name="logout"
      size="20px"
      color="var(--blue-50)"
    />
    Logout
  </app-button>
</template>

<style scoped>
  .logout-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
</style>
