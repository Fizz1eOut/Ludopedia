<script setup lang="ts">
  interface ReviewStatsProps {
    averageRating: number
    totalReviews: number
  }
  defineProps<ReviewStatsProps>();
</script>

<template>
  <div v-if="totalReviews > 0" class="review-stats">
    <div class="review-stats__item">
      Average Rating: <span>★</span> {{ averageRating.toFixed(1) }} / 5
    </div>
    <div class="review-stats__item">
      Total Reviews: {{ totalReviews }} {{ totalReviews === 1 ? 'review' : 'reviews' }}
    </div>
  </div>
</template>

<style scoped>
  .review-stats {
    margin-top: var(--space-xs)
  }
  .review-stats > *:not(:last-child) {
    margin-bottom: var(--space-xs)
  }
  .review-stats__item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: var(--font-size-md);
    color: var(--text-secondary);
  }
   .review-stats__item span {
    padding-bottom: 4px;
    font-size: var(--font-size-xl);
    color: var(--yellow-400);
  }
</style>
