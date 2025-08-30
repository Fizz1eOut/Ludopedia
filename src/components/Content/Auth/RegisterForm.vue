<script setup lang="ts">
  import { ref } from 'vue';
  import AppInput from '@/components/Inputs/AppInput.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import { useAuthStore } from '@/stores/authStore';

  const emit = defineEmits<{
    (e: 'showError', message: string): void;
    (e: 'registerSuccess'): void;
  }>();

  const email = ref('');
  const password = ref('');
  const loading = ref(false);

  const authStore = useAuthStore();

  const register = async () => {
    try {
      loading.value = true;
      const res = await authStore.signUp({
        email: email.value,
        password: password.value
      });

      if (!res.success) {
        emit('showError', res.error ?? 'Registration error');
      } else {
        emit('registerSuccess');
      }
    } catch (err: unknown) {
      emit('showError', err instanceof Error ? err.message : 'Registration error');
    } finally {
      loading.value = false;
    }
  };
</script>

<template>
  <form @submit.prevent="register" class="register-form">
    <div class="login-form__item">
      <app-input v-model="email" placeholder="Email" />
    </div>
    <div class="login-form__item">
      <app-input v-model="password" type="password" placeholder="Password" />
    </div>
    <div class="login-form__item">
      <app-input v-model="password" type="password" placeholder="Confirm password" />
    </div>

    <div class="login-form__button">
      <app-button type="submit" primary :disabled="loading">
        {{ loading ? 'Registering...' : 'Register' }}
      </app-button>
    </div>
  </form>
</template>

<style scoped>
  .register-form > *:not(:last-child) {
    margin-bottom: var(--space-sm);
  }
</style>
