<script setup lang="ts">
  import { computed } from 'vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import { useThemeStore } from '@/stores/themeStore';

  const themeStore = useThemeStore();
  const toggleTheme = themeStore.toggleTheme;

  const iconName = computed(() =>
    themeStore.theme === 'light' ? 'moon' : 'sun'
  );

</script>

<template>
  <div class="theme-switcher">
    <app-underlay>
      <app-button
        class="theme-switcher__button"
        @click="toggleTheme"
      >
        <app-icon
          :name="iconName"
          size="30px"
          color="var(--text-primary)"
        />
      </app-button>
    </app-underlay>
  </div>
</template>

<style scoped>
  .theme-switcher {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    max-width: 42px;
    width: 100%;
    height: 46px;
  }
  .theme-switcher__button {
    padding: 6px;
  }
</style>
