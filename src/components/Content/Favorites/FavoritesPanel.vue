<script setup lang="ts">
  import FavoritesHeader from './FavoritesHeader.vue';
  import FavoritesRemoveButton from './FavoritesRemoveButton.vue';
  import FavoritesGameList from './FavoritesGameList.vue';

</script>

<template>
  <div class="favorites-panel">
    <div class="favorites-panel__row">
      <favorites-header />
      <favorites-remove-button />
    </div>
    <favorites-game-list />
  </div>
</template>

<style scoped>
  .favorites-panel__row {
    margin-top: var(--space-md);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  @media (max-width: 360px) {
    .favorites-panel__row {
      flex-wrap: wrap;
      row-gap: 20px;
    }
  }
</style>
