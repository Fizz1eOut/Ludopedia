<script setup lang="ts">
  import ReviewItem from '@/components/Content/Review/ReviewItem.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import type { Review } from '@/stores/reviewsStore';

  interface ReviewListProps {
    reviews: readonly Review[]
    currentUserId: string | null
  }

  defineProps<ReviewListProps>();

  const emit = defineEmits<{
    delete: [reviewId: string]
  }>();

  const handleDelete = (reviewId: string) => {
    emit('delete', reviewId);
  };
</script>

<template>
  <div v-if="reviews.length > 0" class="review-list">
    <app-title>All reviews</app-title>
    <ul class="review-list__list">
      <review-item
        v-for="review in reviews"
        :key="review.id"
        :review="review"
        :is-owner="currentUserId === review.user_id"
        @delete="handleDelete"
      />
    </ul>
  </div>

  <div v-else class="no-reviews">
    <p>There are no reviews yet.</p>
  </div>
</template>

<style scoped>
  .review-list {
    width: 100%;
  }
  .review-list__list > *:not(:last-child) {
    margin-bottom: var(--space-sm);
  } 
  .review-list__list {
    margin-top: var(--space-sm)
  }
  .no-reviews {
    text-align: center;
    font-size: var(--font-size-md);
    color: var(--text-secondary);
  }
</style>
