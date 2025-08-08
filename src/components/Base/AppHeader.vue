<script setup lang="ts">
  import AppLogo from '@/components/Base/AppLogo.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppThemeSwitcher from '@/components/Base/AppThemeSwitcher.vue';
  import AppSearch from '@/components/Base/AppSearch.vue';
  import AppProfile from '@/components/Base/AppProfile.vue';
  import AppSearchMobile from '@/components/Base/AppSearchMobile.vue';
  import { useMediaQuery } from '@/composables/useMediaQuery';

  const { isMobile } = useMediaQuery('(max-width: 768px)');
</script>

<template>
  <div class="header">
    <app-container>
      <div class="header__body">
        <app-logo />
        <app-search v-if="!isMobile" />
        <div class="header__group">
          <app-search-mobile v-if="isMobile" />
          <app-theme-switcher />
          <app-profile />
        </div>
      </div>
    </app-container>
  </div>
</template>

<style scoped>
  .header__body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  .header__group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
</style>
