<script setup lang="ts">
  import { computed } from 'vue';

  interface SearchInputProps {
    modelValue: string;
    placeholder?: string;
    type?: string;
  }
  const props = defineProps<SearchInputProps>();

  const emit = defineEmits(['update:modelValue']);

  const inputValue = computed({
    get: () => props.modelValue,
    set: (newValue: string | number) => emit('update:modelValue', newValue),
  });

  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
  };
</script>

<template>
  <div class="input-wrapper">
    <slot name="icon-before"></slot>
    <input 
      v-model="inputValue"
      :type="type || 'text'"
      class="input" 
      :placeholder="placeholder"
      @input="handleInput"
    >
    <label for="#" class="label" />
    <slot name="icon-after"></slot>
  </div>
</template>

<style scoped>
  .input {
    width: 100%;
    padding: 10px 30px;
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-medium);
    color: var(--color-white);
    background-color: var(--surface-color);
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-sm);
    outline: none;
  }
  ::-webkit-input-placeholder {
    color: var(--text-muted);
  }
  :-moz-placeholder { 
    color: var(--text-muted);
  }
  ::-moz-placeholder { 
    color: var(--text-muted);
  }
  :-ms-input-placeholder {
    color: var(--text-muted);
  }
</style>
