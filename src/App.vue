<script setup lang="ts">
  import { onMounted } from 'vue';
  import { RouterView } from 'vue-router';
  import AppHeader from '@/components/Base/AppHeader.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import { useAuthStore } from '@/stores/authStore';
  import { useFavoritesStore } from '@/stores/favoritesStore';
  import { useReviewsStore } from '@/stores/reviewsStore';
  const favorites = useFavoritesStore();

  const auth = useAuthStore();
  const reviews = useReviewsStore();

  onMounted(async () => {
    await auth.initialize();
    if (auth.isAuthenticated) {
      await favorites.loadFavorites();
      await reviews.loadUserReviews();
    }
  });
</script>

<template>
  <header>
    <app-header />
  </header>

  <main>
    <app-container>
      <router-view />
    </app-container>
  </main>
</template>
