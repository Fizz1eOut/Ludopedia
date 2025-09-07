<script setup lang="ts">
  import { ref} from 'vue';
  import AppIcon from '@/components/Base/AppIcon.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import AppModal from '@/components/Base/AppModal.vue';
  import AuthForm from '@/components/Content/Auth/AuthForm.vue';
  import { useAuthStore } from '@/stores/authStore';

  const authStore = useAuthStore();
  const isModalOpen = ref(false);

  const openModal = () => {
    if (authStore.isAuthenticated) {
      alert(`Пользователь ${authStore.userEmail} уже авторизован`);
      return;
    }
  
    isModalOpen.value = true;
  };
</script>

<template>
  <app-underlay>
    <div class="profile" @click="openModal">
      <app-icon
        name="profile"
        size="30px"
        color="var(--text-primary)"
        class="profile__icon"
      />
    </div>
  </app-underlay>

  <app-modal
    :model-value="isModalOpen"
    @update:model-value="isModalOpen = $event"
  >
    <auth-form @close="isModalOpen = false"  @authSuccess="isModalOpen = false"  />
  </app-modal>
</template>

<style scoped>
  .profile {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 42px;
    height: 46px;
    cursor: pointer;
  }
   @media (max-width: 400px) {
    .profile {
      width: 36px;
      height: 40px;
    }
  }
</style>
