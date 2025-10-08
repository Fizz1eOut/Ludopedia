<script setup lang="ts">
  import { onMounted, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useReviewsStore } from '@/stores/reviewsStore';
  import { useAuthStore } from '@/stores/authStore';
  import ReviewStats from '@/components/Content/Review/ReviewStats.vue';
  import ReviewForm from '@/components/Content/Review/ReviewForm.vue';
  import ReviewList from '@/components/Content/Review/ReviewList.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';

  interface Props {
    gameId: string
  }

  const props = defineProps<Props>();

  const reviewStore = useReviewsStore();
  const authStore = useAuthStore();

  const { reviews, averageRating, loading } = storeToRefs(reviewStore);
  const { loadReviews, addReview, deleteReview } = reviewStore;
  const { isAuthenticated, userId } = storeToRefs(authStore);

  onMounted(() => {
    loadReviews(props.gameId);
  });
  
  watch(() => props.gameId, (newId) => {
    if (newId) loadReviews(newId);
  });

  const handleReviewSubmit = async (payload: { rating: number; comment: string }) => {
    const { success, error: errMsg } = await addReview(
      props.gameId,
      payload.rating,
      payload.comment
    );

    if (!success) {
      alert(errMsg || 'Error adding review');
    }
  };

  const handleReviewDelete = async (reviewId: string) => {
    await deleteReview(reviewId);
  };
</script>

<template>
  <div class="review-block">
    <app-title>Player Reviews</app-title>

    <review-stats 
      :total-reviews="reviews.length" 
      :average-rating="averageRating" 
    />

    <div class="review-block__group">
      <div class="review-block__item">
        <review-form
          v-if="isAuthenticated"
          :game-id="gameId"
          :loading="loading"
          @submit="handleReviewSubmit"
        />
        <div v-else>
          <app-title>Please sign in to post a review.</app-title>
        </div>
      </div>

      <div class="review-block__item">
        <review-list 
          :reviews="reviews"
          :current-user-id="userId ?? null"
          @delete="handleReviewDelete"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .review-block {
    margin-top: var(--space-xl);
  }
  .review-block__group {
    margin-top: var(--space-xl);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
  }
  .review-block__item {
    width: 100%;
  }
  @media (max-width: 768px) {
    .review-block__group {
      flex-direction: column;
    }
  }
</style>
