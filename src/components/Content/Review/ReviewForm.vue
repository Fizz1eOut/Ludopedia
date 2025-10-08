<script setup lang="ts">
  import { ref } from 'vue';
  import ReviewRating from './ReviewRating.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppButton from '@/components/Base/AppButton.vue';

  interface ReviewFormProps {
    gameId: string
    loading: boolean
  }
  defineProps<ReviewFormProps>();

  const emit = defineEmits<{
    submit: [payload: { rating: number; comment: string }]
  }>();

  const rating = ref<number>(1);
  const comment = ref<string>('');

  const handleSubmit = () => {
    if (!comment.value.trim()) {
      alert('Введите текст отзыва');
      return;
    }

    emit('submit', {
      rating: rating.value,
      comment: comment.value
    });

    comment.value = '';
    rating.value = 0;
  };
</script>

<template>
  <div class="review-form">
    <app-title>Leave feedback</app-title>

    <review-rating v-model="rating" />

    <div class="review-form__item">
      <textarea
        v-model="comment"
        placeholder="Write your review..."
        rows="3"
        cols="40"
        class="review-form__textarea"
      ></textarea>
    </div>

    <div class="review-form__button">
      <app-button primary @click="handleSubmit" :disabled="loading">
        Send
      </app-button>
    </div>
  </div>
</template>

<style scoped>
  .review-form {
    width: 100%;
  }
  .review-form__textarea {
    width: 100%;
    padding: 20px 30px;
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-medium);
    color: var(--color-white);
    background-color: var(--surface-color);
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-sm);
    outline: none;
  }
  .review-form__button {
    margin-top: var(--space-sm);
  }

  textarea::placeholder {
    color: var(--text-muted);
  }
  textarea::-webkit-input-placeholder {
    color: var(--text-muted);
  }
  textarea:-moz-placeholder {
    color: var(--text-muted);
  }
  textarea::-moz-placeholder {
    color: var(--text-muted);
  }
  textarea:-ms-input-placeholder {
    color: var(--text-muted);
  }
</style>
