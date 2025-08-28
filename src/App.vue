<script setup lang="ts">
  import { onMounted } from 'vue';
  import { RouterView } from 'vue-router';
  import AppHeader from '@/components/Base/AppHeader.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import { useAuthStore } from '@/stores/authStore';

  const auth = useAuthStore();

  onMounted(() => {
    auth.initialize();
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
