<script setup lang="ts">
  import { useFavoritesStore } from '@/stores/favoritesStore';
  import AppIcon from '@/components/Base/AppIcon.vue';
  import ProfileChangePassword from '@/components/Content/Profile/ProfileChangePassword.vue';

  const favoritesStore = useFavoritesStore();
</script>

<template>
  <div class="profile-nav">
    <ul class="profile-nav__list">
      <li class="profile-nav__item">
        <div class="profile-nav__row">
          <app-icon 
            name="heart"
            size="20px"
            color="var(--red-500)"
          />
          Favorites
        </div>
        <div class="profile-nav__count">
          {{ favoritesStore.favoritesCount }}
        </div>
      </li>

      <li class="profile-nav__item">
        <div class="profile-nav__row">
          <app-icon 
            name="comment"
            size="20px"
            color="var(--purple-400)"
          />
          My comments
        </div>
        <div class="profile-nav__count">
          0
        </div>
      </li>

      <li class="profile-nav__item">
        <profile-change-password />
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .profile-nav {
    border-top: 1px solid var(--border-color);
    margin-top: 40px;
    padding-top: 30px;
  }
  .profile-nav__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    font-size: var(--font-size-lg);
    color: var(--text-secondary);
    transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    cursor: pointer;
    border-radius: var(--radius-md);
  }
  .profile-nav__item:hover {
    background-color: var(--hover-color);
    box-shadow: var(--shadow-lg);
  }
  .profile-nav__row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
</style>
