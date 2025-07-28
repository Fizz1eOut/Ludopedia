<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import AppHeader from '@/components/Base/AppHeader.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
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
