<script setup lang="ts">
  import { computed } from 'vue';
  import AppIcon from '@/components/Base/AppIcon.vue';

  type TagType = 'badge' | 'chip' | 'feature' | 'success';

  interface AppTagProps {
    type: TagType;
    text: string;
    icon?: string;
    iconColor?: string;
    rating?: number | string;
  }
  const props = defineProps<AppTagProps>();

  const tagClasses = computed(() => `app-tag--${props.type}`);

  const formattedRating = computed(() => {
    if (typeof props.rating !== 'number') return props.rating || '';

    const scaled = props.rating / 10;
    const truncated = Math.floor(scaled * 10) / 10;
    return truncated.toString().replace('.', ',');
  });

</script>

<template>
  <div :class="tagClasses" class="app-tag">
    <div class="app-tag_content">
      <app-icon 
        v-if="props.icon" 
        :name="props.icon"
        :color="props.iconColor"
        size="20px"
        class="app-tag__icon"
      />
      <div class="app-tag__text">{{ text }}</div>
    </div>
    <div v-if="rating" class="app-tag__rating">
      <app-icon
        v-if="typeof props.rating === 'number'"
        name="star" 
        size="18px"
        color="var(--yellow-400)"
      />
      {{ formattedRating }}
    </div>
  </div>
</template>

<style scoped>
  .app-tag {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-regular);
    color: var(--white);
    backdrop-filter: var(--backdrop-blur);
    -webkit-backdrop-filter: var(--backdrop-blur);
  }
  .app-tag_content {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .app-tag--badge { 
    border: 1px solid var(--blue-900);
    border-radius: var(--radius-xl);
    background: var(--gradient-genres);
  }
  .app-tag--chip {
    background-color: var(--black-300);
    border-radius: var(--radius-sm);
    border: 1px solid var(--slate-700);
  }
  .app-tag--success {
    color: var(--green-400);
    border-radius: var(--radius-sm);
    border: 1px solid var(--green-400);
    background-color: rgb(20 83 45 / 0.3)
  }
  .app-tag--feature {
    font-size: var(--font-size-sm);
    background-color: var(--yellow-100);
    color: var(--yellow-50);
    border: 1px solid var(--yellow-200);
    border-radius: var(--radius-sm);
  }
  .app-tag__rating {
    display: flex;
    align-items: center;
    gap: 4px;
  }
</style>
