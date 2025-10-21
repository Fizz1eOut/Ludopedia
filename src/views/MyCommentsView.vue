<script setup lang="ts">
  import { onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
  import { useReviewsStore } from '@/stores/reviewsStore';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import ReviewItem from '@/components/Content/Review/ReviewItem.vue';

  const reviewStore = useReviewsStore();
  const router = useRouter();

  const { userReviews, loading } = storeToRefs(reviewStore);
  const { loadUserReviews, deleteReview } = reviewStore;

  onMounted(() => {
    loadUserReviews();
  });

  const handleDelete = async (reviewId: string) => {
    const { success } = await deleteReview(reviewId);
    if (success) {
      await loadUserReviews();
    }
  };

  const goToGame = (gameId: string) => {
    router.push(`/game/${gameId}`);
  };
</script>

<template>
  <div class="my-comments">
    <app-title>My Comments</app-title>

    <div v-if="loading" class="my-comments__loading">
      Loading your comments...
    </div>

    <div v-else-if="userReviews.length === 0" class="my-comments__empty">
      <p>You haven't left any comments yet.</p>
    </div>

    <ul v-else class="my-comments__list">
      <li 
        v-for="review in userReviews" 
        :key="review.id"
        class="my-comments__item"
      >
        <review-item 
          :review="review"
          :is-owner="true"
          @delete="handleDelete"
        />
        <div class="my-comments__actions">
          <app-button 
            gradient
            class="my-comments__view-game"
            @click="goToGame(review.game_id)"
          >
            <app-icon 
              name="eye"
              size="16px"
            />
            Go to Game Page
          </app-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .my-comments__list {
    margin-top: var(--space-xl);
  }
  .my-comments__empty {
    margin-top: var(--space-md);
  }
  .my-comments__item:not(:last-child) {
    margin-bottom: var(--space-md);
  }
  .my-comments__view-game {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
</style>
