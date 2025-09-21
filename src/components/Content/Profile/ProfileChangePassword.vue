<script setup lang="ts">
  import { ref } from 'vue';
  import AppIcon from '@/components/Base/AppIcon.vue';
  import AppModal from '@/components/Base/AppModal.vue';
  import ChangePasswordForm from '@/components/Content/Auth/ChangePasswordForm.vue';
  import { useAuthStore } from '@/stores/authStore';

  const authStore = useAuthStore();
  const isModalOpen = ref(false);
  const handleClick = () => {
    if (authStore.isAuthenticated) {
      isModalOpen.value = true;
    } 
  };
</script>

<template>
  <div class="change-password">
    <div class="change-password__row" @click="handleClick">
      <app-icon 
        name="shield"
        size="20px"
        color="var(--green-400)"
      />
      Change password
    </div>
    <app-modal
      v-if="authStore.isAuthenticated"
      :model-value="isModalOpen"
      @update:model-value="isModalOpen = $event"
    >
      <change-password-form @close="isModalOpen = false"  @success="isModalOpen = false"  />
    </app-modal>
  </div>
</template>

<style scoped>
  .change-password__row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
</style>
