<script setup lang="ts">
  import { ref} from 'vue';
  import AppIcon from '@/components/Base/AppIcon.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import AppModal from '@/components/Base/AppModal.vue';
  import AuthForm from '@/components/Content/Auth/AuthForm.vue';
  import AppSidebar from '@/components/Base/AppSidebar.vue';
  import ProfileMenu from '@/components/Content/Profile/ProfileMenu.vue';
  import ProfileUserAvatar from '@/components/Content/Profile/ProfileUserAvatar.vue';
  import { useAuthStore } from '@/stores/authStore';

  const authStore = useAuthStore();
  const isModalOpen = ref(false);
  const isSidebarOpen = ref(false);

  const handleClick = () => {
    if (authStore.isAuthenticated) {
      isSidebarOpen.value = !isSidebarOpen.value;
    } else {
      isModalOpen.value = true;
    }
  };
  const handleLogout = () => {
    isSidebarOpen.value = false;
  };
</script>

<template>
  <app-underlay v-if="!authStore.isAuthenticated">
    <div class="profile" @click="handleClick">
      <app-icon
        name="profile"
        size="30px"
        color="var(--text-primary)"
        class="profile__icon"
      />
    </div>
  </app-underlay>
  <profile-user-avatar
    v-else
    size="42px"
    @click="handleClick"
    class="profile__avatar"
  />

  <app-modal
    v-if="!authStore.isAuthenticated"
    :model-value="isModalOpen"
    @update:model-value="isModalOpen = $event"
  >
    <auth-form @close="isModalOpen = false"  @authSuccess="isModalOpen = false"  />
  </app-modal>

  <app-sidebar v-model="isSidebarOpen" side="right">
    <template #title>
      My Profile
    </template>
    <profile-menu @logout-success="handleLogout" />
  </app-sidebar>
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
  .profile__avatar {
    cursor: pointer;
    transition: scale 0.3s ease-in-out;
  }
  .profile__avatar:hover {
    scale: 1.1;
  }
   @media (max-width: 400px) {
    .profile {
      width: 36px;
      height: 40px;
    }
  }
</style>
