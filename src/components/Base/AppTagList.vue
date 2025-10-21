<script setup lang="ts">
  import { ref, computed } from 'vue';
  import AppTag from '@/components/Base/AppTag.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import type { BaseEntity } from '@/interface/game.interface';

  const props = defineProps<{
    items?: readonly BaseEntity[]
    type?: 'badge' | 'chip' | 'feature' | 'success'
  }>();

  const showAll = ref(false);

  const itemsArray = computed(() => (props.items ? [...props.items] : []));

  const visibleTags = computed(() => {
    return showAll.value ? itemsArray.value : itemsArray.value.slice(0, 3);
  });

  const hiddenCount = computed(() => {
    return itemsArray.value.length > 3 ? itemsArray.value.length - 3 : 0;
  });

  function toggleShow() {
    showAll.value = !showAll.value;
  }
</script>

<template>
  <div class="app-tag-list">
    <app-tag
      v-for="(tag, idx) in visibleTags"
      :key="tag.id ?? `${tag.name}-${idx}`"
      :type="type || 'badge'"
      :text="tag.name"
    />
    <div class="app-tag-list__button">
      <app-button v-if="hiddenCount > 0" class="app-tag-list__more" @click="toggleShow">
        {{ showAll ? 'Hide' : `+${hiddenCount}` }}
      </app-button>
    </div>
  </div>
</template>

<style scoped>
  .app-tag-list {
    display: flex;
    align-items: center;  
    flex-wrap: wrap;
    gap: 10px;
  }
  .app-tag-list__more {
    font-size: var(--font-size-sm);
    color: var(--purple-400);
  }
</style>

