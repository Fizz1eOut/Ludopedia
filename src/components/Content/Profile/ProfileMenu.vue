<script setup lang="ts">
  import ProfileUserAvatar from '@/components/Content/Profile/ProfileUserAvatar.vue';
  import ProfileAvatarUpload from '@/components/Content/Profile/ProfileAvatarUpload.vue';
  import ProfileUserInfo from '@/components/Content/Profile/ProfileUserInfo.vue';
  import ProfileLogoutButton from '@/components/Content/Profile/ProfileLogoutButton.vue';
  import ProfileMenuNav from '@/components/Content/Profile/ProfileMenuNav.vue';

  const emit = defineEmits<{
    (e: 'logoutSuccess'): void;
  }>();
</script>

<template>
  <div class="profile-menu">
    <div class="profile-menu__body">
      <div class="profile-menu__header">
        <div class="profile-menu__avatar">
          <profile-user-avatar size="100px" />
          <profile-avatar-upload class="upload" />
        </div>
      </div>
    
      <div class="profile-menu__content">
        <profile-user-info />
        <profile-menu-nav />
      </div>
    </div>

    <profile-logout-button @logoutSuccess="emit('logoutSuccess')" />
  </div>
</template>

<style scoped>
  .profile-menu {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;
  }
  .profile-menu__header {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .profile-menu__avatar {
    position: relative;
  }
  .upload {
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>
