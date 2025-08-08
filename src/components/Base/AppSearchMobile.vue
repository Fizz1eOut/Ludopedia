<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import AppIcon from '@/components/Base/AppIcon.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppSearch from '@/components/Base/AppSearch.vue';

  const isActive = ref(false);
  const searchMobileRef = ref<HTMLElement>();

  const toggle = (event: Event) => {
    event.stopPropagation();
    isActive.value = !isActive.value;
  };

  const handleClickOutside = (event: Event) => {
    const target = event.target as Element;
    const searchMobile = searchMobileRef.value;
    
    if (searchMobile && !searchMobile.contains(target) && 
      !target.closest('.search-mobile__underlay')) {
      isActive.value = false;
    }
  };

  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });
</script>

<template>
  <app-underlay>
    <div ref="searchMobileRef"
         @click="toggle"
         class="search-mobile"
    >
      <app-icon
        v-if="!isActive"
        name="search"
        size="25px"
        color="var(--text-primary)"
      />
      <app-icon
        v-else
        name="cross"
        size="20px"
        color="var(--text-primary)"
      />
    </div>
  </app-underlay>

  <transition name="search-dropdown">
    <app-underlay v-if="isActive" class="search-mobile__underlay">
      <app-container>
        <app-search/>
      </app-container>
    </app-underlay>
  </transition>
</template>

<style scoped>
  .search-mobile {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 42px;
    height: 46px;
  }
  .search-mobile__underlay {
    position: absolute;
    top: 62px;
    left: 0;
    width: 100%;
    z-index: 10;
  }

  .search-dropdown-enter-active {
    animation: slideInBounce 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .search-dropdown-leave-active {
    animation: slideOutFade 0.2s ease-in-out;
  }
  @keyframes slideInBounce {
    0% {
      opacity: 0;
      transform: translateY(-15px) scale(0.9);
    }
    60% {
      opacity: 0.8;
      transform: translateY(2px) scale(1.02);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  @keyframes slideOutFade {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-8px) scale(0.95);
    }
  }

  @media (max-width: 400px) {
    .search-mobile {
      width: 36px;
      height: 40px;
    }
  }
</style>
