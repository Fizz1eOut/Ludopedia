<script setup lang="ts">
  
</script>

<template>
  <div class="link line">
    <slot></slot>
  </div>
</template>

<style scoped>
.link {
  font-family: "Inter", sans-serif;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-regular);
  color: var(--blue-500);
  transition: all color 0.3s ease-in-out;
  cursor: pointer;
}
.link:hover {
  color: var(--blue-600);
  text-decoration: underline;
}
</style>
