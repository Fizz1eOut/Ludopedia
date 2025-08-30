<script setup lang="ts">
  import { ref } from 'vue';
  import LoginForm from '@/components/Content/Auth/LoginForm.vue';
  import RegisterForm from '@/components/Content/Auth/RegisterForm.vue';
  import ForgotPasswordModal from '@/components/Content/Auth/ForgotPasswordForm.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';
  import { useRouter } from 'vue-router';

  const emit = defineEmits<{
    (e: 'showError', message: string): void;
    (e: 'authSuccess'): void;
    (e: 'close'): void;
    (e: 'showSuccess'): void;
  }>();

  const router = useRouter();
  const currentForm = ref<'login' | 'register' | 'forgot'>('login');

  const switchToLogin = () => currentForm.value = 'login';
  const switchToForgot = () => currentForm.value = 'forgot';

  const handleShowError = (message: string) => {
    emit('showError', message);
  };
  const handleAuthSuccess = () => {
    router.push('/');
  };
  const handleShowSuccess = () => {
    emit('showSuccess');
  };
</script>

<template>
  <div class="auth-form">
    <div class="auth-form__row">
      <app-title>
        <app-title>
          {{
            currentForm === 'login' ? 'Login' :
            currentForm === 'register' ? 'Registration' :
            'Password recovery'
          }}
        </app-title>
      </app-title>
      <app-button class="auth-form__close" @click="$emit('close')">
        <app-icon
          name="cross"
          size="20px"
          style="color: var(--white)"
        />
      </app-button>
    </div>
    <div class="auth-form__content">
      <login-form 
        v-if="currentForm === 'login'"  
        @showError="handleShowError" 
        @loginSuccess="$emit('authSuccess')" 
        @close="$emit('close')"
        @forgotPassword="switchToForgot"
      />
      <register-form 
        v-if="currentForm === 'register'"
        @showError="handleShowError" 
        @registerSuccess="handleAuthSuccess"
        @close="$emit('close')"
      />
      <forgot-password-modal
        v-if="currentForm === 'forgot'"
        @close="switchToLogin"
        @showError="handleShowError"
        @showSuccess="handleShowSuccess"
      />
    </div>

    <div class="auth-form__button">
      <app-button 
        type="submit"
        v-if="currentForm !== 'forgot'" 
        @click="currentForm = currentForm === 'login' ? 'register' : 'login'"
        class="toggle-text"
      >
        {{ currentForm === 'login' ? 'Don`t have an account? Sign up' : 'Already have an account? Login' }}
      </app-button>
    </div>
  </div>
</template>

<style scoped>
  .auth-form > *:not(:last-child) {
    margin-bottom: var(--space-md);
  }
  .auth-form__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  .auth-form__close {
    max-width: 30px; 
  }
  .toggle-text {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-medium);
    transition: all 0.3s ease-in-out;
  }
  .toggle-text:hover {
    text-decoration: underline;
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
