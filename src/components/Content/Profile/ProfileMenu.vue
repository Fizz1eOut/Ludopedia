<script setup lang="ts">
  import ProfileUserAvatar from '@/components/Content/Profile/ProfileUserAvatar.vue';
  import ProfileAvatarUpload from '@/components/Content/Profile/ProfileAvatarUpload.vue';
  import ProfileUserInfo from '@/components/Content/Profile/ProfileUserInfo.vue';
  import ProfileLogoutButton from '@/components/Content/Profile/ProfileLogoutButton.vue';

  const emit = defineEmits<{
    (e: 'logoutSuccess'): void;
  }>();
</script>

<template>
  <div class="profile-menu">
    <div class="profile-menu__group">
      <div class="profile-menu__avatar">
        <profile-user-avatar size="100px" />
        <profile-avatar-upload class="upload" />
      </div>
    </div>
    <profile-user-info />
    <profile-logout-button @logoutSuccess="emit('logoutSuccess')" />
  </div>
</template>

<style scoped>
  .profile-menu__group {
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
