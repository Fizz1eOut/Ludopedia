<script setup lang="ts">
  import ModalHeader from '@/components/Content/Modal/ModalHeader.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';

  interface ModalProps {
    modelValue?: boolean;
  }
  withDefaults(defineProps<ModalProps>(), {
    modelValue: false
  });

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
  }>();

  const close = () => {
    emit('update:modelValue', false);
  };
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div v-if="modelValue" class="modal">
        <div class="overlay" @click.self="close">
          <div class="content">
            <app-underlay>
              <app-container size="sm" class="modal-container">
                <modal-header @close="close" />

                <div class="content__body">
                  <slot />
                </div>
              </app-container>
            </app-underlay>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
  .content__body {
    padding-top: var(--space-md);
  }
  .overlay {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 11;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
  }
  .content {
    border-radius: var(--radius-lg);
    max-width: 700px;
    width: 100%;
  }
  @media (max-width: 499px) {
    .modal-container {
      padding: 10px;
    }
    .content__body {
      padding-top: var(--space-sm);
    }
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
