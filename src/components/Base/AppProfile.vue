<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/authStore';

  import AppIcon from '@/components/Base/AppIcon.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import AppModal from '@/components/Base/AppModal.vue';
  import AuthForm from '@/components/Content/Auth/AuthForm.vue';

  const isModalOpen = ref(false);
  const router = useRouter();
  const auth = useAuthStore();

  const openModal = () => {
    isModalOpen.value = true;
  };

  const goToProfile = () => {
    router.push('/profile');
  };
</script>

<template>
  <app-underlay>
    <div class="profile" @click="auth.isAuthenticated ? goToProfile() : openModal()">
      <app-icon
        name="profile"
        size="30px"
        color="var(--text-primary)"
        class="profile__icon"
      />
    </div>
  </app-underlay>

  <app-modal
    v-if="!auth.isAuthenticated"
    :model-value="isModalOpen"
    @update:model-value="isModalOpen = $event"
  >
    <auth-form
      @close="isModalOpen = false"
      @authSuccess="isModalOpen = false"
    />
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
