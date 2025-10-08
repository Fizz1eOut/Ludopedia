<script setup lang="ts">
  import ReviewRating from './ReviewRating.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';
  import type { Review } from '@/stores/reviewsStore';

  interface ReviewItemProps {
    review: Review
    isOwner: boolean
  }

  const props = defineProps<ReviewItemProps>();

  const emit = defineEmits<{
    delete: [reviewId: string]
  }>();

  const handleDelete = () => {
    const confirmDelete = confirm('Удалить отзыв?');
    if (confirmDelete) {
      emit('delete', props.review.id);
    }
  };
</script>

<template>
  <li class="review-item">
    <app-underlay>
      <app-container>
        <div class="review-item__body">
          <div class="review-item__content">
            <div class="review-item__header">
              <div class="review-item__username">{{ review.user?.username }}</div>
              <div class="review-item__date">{{ new Date(review.created_at).toLocaleString() }}</div>
              <review-rating :model-value="review.rating" :readonly="true" />
            </div>

            <p class="review-item__comment">{{ review.comment }}</p>
          </div>

          <div class="review-item__remove">
            <div class="review-item__button">
              <app-button 
                v-if="isOwner" 
                @click="handleDelete"
              >
                <app-icon
                  name="cross"
                  size="20px"
                  style="color: var(--white)"
                />
              </app-button>
            </div>
          </div>
        </div>
      </app-container>
    </app-underlay>
  </li>
</template>

<style scoped>
  .review-item {
    border: 1px solid var(--border-color);
    background-color: var(--background-color);
    border-radius: var(--radius-sm);
  }
  .review-item__body {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
  }
  .review-item__date {
    margin-top: var(--space-xs);
    color: var(--text-secondary);
  }
  .review-item__username {
    font-size: var(--font-size-lg);
    color: var(--text-primary);
  }
  .review-item__comment {
    margin-bottom: var(--space-sm);
  }
  .review-item__button {
    width: 20px;
  }
</style>
