<script setup lang="ts">
  import GamesList from '@/components/Content/Games/GamesList.vue';
  import GameFilters from '@/components/Content/Games/GameFilters.vue';
</script>

<template>
  <div class="games-container">
    <game-filters />
    <games-list />
  </div>
</template>

<style scoped>
  .games-container {
    margin-top: var(--space-xl);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
  }
  @media (max-width: 610px) {
    .games-container {
      flex-direction: column;
      row-gap: 20px;
    }
  }
</style>
