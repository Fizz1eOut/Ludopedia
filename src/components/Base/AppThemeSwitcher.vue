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
  <app-underlay>
    <div class="theme-switcher">
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
    </div>
  </app-underlay>
</template>

<style scoped>
  .theme-switcher {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 42px;
    height: 46px;
  }
    @media (max-width: 400px) {
    .theme-switcher {
      width: 36px;
      height: 40px;
    }
  }
</style>
