<script setup lang="ts">
  import { ref} from 'vue';
  import AppInput from '@/components/Inputs/AppInput.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import { useAuthStore } from '@/stores/authStore';
  
  const emit = defineEmits<{
    (e: 'showError', message: string): void;
    (e: 'loginSuccess'): void;
    (e: 'forgotPassword'): void;
  }>();

  const authStore = useAuthStore();
  const email = ref('');
  const password = ref('');
  const loading = ref(false);

  const login = async () => {
    try {
      loading.value = true;
      const res = await authStore.signIn({
        email: email.value,
        password: password.value
      });

      if (!res.success) {
        emit('showError', res.error ?? 'Login error');
      } else {
        emit('loginSuccess');
      }
    } catch (err: unknown) {
      emit('showError', err instanceof Error ? err.message : 'Login error');
    } finally {
      loading.value = false;
    }
  };
</script>

<template>
  <form @submit.prevent="login" class="login-form">
    <div class="login-form__item">
      <app-input v-model="email" placeholder="Email" />
    </div>
    <div class="login-form__item">
      <app-input v-model="password" type="password" placeholder="Password" />
      <app-button 
        @click.prevent="$emit('forgotPassword')"
        class="login-form__forgot-password"
      >
        Forgot your password?
      </app-button>
    </div>
    <div class="login-form__button">
      <app-button type="submit" primary>Login</app-button>
    </div>
  </form>
</template>

<style scoped>
  .login-form > *:not(:last-child) {
    margin-bottom: var(--space-sm);
  }
  .login-form__forgot-password {
    margin-top: var(--space-xs);
    display: flex;
    align-items: flex-start;
    color: var(--blue-400);
    transition: all 0.3s ease-in-out;
  }
  .login-form__forgot-password:hover {
    text-decoration: underline;
  }
</style>
