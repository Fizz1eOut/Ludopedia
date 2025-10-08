<script setup lang="ts">
  import { ref, computed } from 'vue';

  interface ReviewRatingProps {
    modelValue: number
    max?: number
    readonly?: boolean
  }
  
  const props = withDefaults(defineProps<ReviewRatingProps>(), {
    max: 5,
    readonly: false
  });

  const emit = defineEmits<{
    'update:modelValue': [value: number]
  }>();

  const hoveredStar = ref<number | null>(null);

  const rating = computed({
    get: () => props.modelValue,
    set: (value: number) => emit('update:modelValue', value)
  });

  const selectRating = (star: number) => {
    if (!props.readonly) {
      rating.value = star;
    }
  };

  const onMouseEnter = (star: number) => {
    if (!props.readonly) {
      hoveredStar.value = star;
    }
  };

  const onMouseLeave = () => {
    hoveredStar.value = null;
  };

  const isStarActive = (star: number) => {
    const currentRating = hoveredStar.value ?? rating.value;
    return star <= currentRating;
  };
</script>

<template>
  <div class="rating-container">
    <div class="rating-container__title">Rating:</div>
    <div 
      class="rating-container__stars" 
      :class="{ 'readonly': readonly }"
      @mouseleave="onMouseLeave"
    >
      <span
        v-for="star in max"
        :key="star"
        class="rating-container__star"
        :class="{ 'active': isStarActive(star) }"
        @click="selectRating(star)"
        @mouseenter="onMouseEnter(star)"
      >
        ★
      </span>
    </div>
  </div>
</template>

<style scoped>
  .rating-container {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: var(--space-xs);
  }
  .rating-container__title {
    font-size: var(--font-size-md);
    color: var(--text-primary);
  }
  .rating-container__stars {
    display: inline-flex;
    gap: 0.25rem;
  }
  .rating-container__star {
    font-size: var(--font-size-2xl);
    color: var(--text-secondary);
    cursor: pointer;
    transition: color 0.3s ease-in-out, transform 0.3s ease-in-out;
    user-select: none;
  }
  .rating-container__star.active {
    color: var(--yellow-400);
  }
  .rating-container__star:hover {
    transform: scale(1.1);
  }
  .rating-container__stars.readonly .star {
    cursor: default;
  }
  .rating-container__stars.readonly .star:hover {
    transform: none;
  }
</style>
