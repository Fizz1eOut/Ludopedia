<script setup lang="ts">
  import { ref, computed } from 'vue';
  import AppInput from '@/components/Inputs/AppInput.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';
  import { useAuthStore } from '@/stores/authStore';
  import { useForm, useField } from 'vee-validate';
  import * as yup from 'yup';

  const emit = defineEmits<{
    (e: 'showError', message: string): void;
    (e: 'loginSuccess'): void;
    (e: 'forgotPassword'): void;
  }>();

  const validationSchema = yup.object({
    email: yup.string()
      .required('Enter your email')
      .email('Invalid email format'),
    password: yup.string().required('Enter your password').min(6, 'At least 6 characters'),
  });

  const authStore = useAuthStore();
  const loading = ref(false);

  const { handleSubmit } = useForm({ validationSchema });

  const { value: email, errorMessage: emailError } = useField<string>('email', undefined, { initialValue: '' });
  const { value: password, errorMessage: passwordError } = useField<string>('password', undefined, { initialValue: '' });

  const hasError = computed(() => !!emailError.value || !!passwordError.value);

  const onSubmit = handleSubmit(async (values) => {
    try {
      loading.value = true;
      const res = await authStore.signIn({
        email: values.email,
        password: values.password,
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
  });

  const showPassword = ref(false);
  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
  };
</script>

<template>
  <form @submit.prevent="onSubmit" class="login-form">
    <div class="login-form__item">
      <app-input 
        v-model="email"
        placeholder="Email"
        :class="{ 'has-error': emailError }" 
      />
      <span class="error-message">{{ emailError }}</span>
    </div>

    <div class="login-form__item">
      <app-input 
        v-model="password" 
        :type="showPassword ? 'text' : 'password'" 
        placeholder="Password" 
        :class="{ 'has-error': passwordError }" 
      />
      <app-button 
        type="button"
        class="toggle-password" 
        @click="togglePasswordVisibility"
      >
        <app-icon 
          :name="showPassword ? 'eye-off' : 'eye'" 
          size="20px" 
          style="color: var(--white)" 
        />
      </app-button>
      <span class="error-message">{{ passwordError }}</span>
      
      <app-button 
        type="button"
        @click.prevent="$emit('forgotPassword')" 
        class="login-form__forgot-password"
      >
        Forgot your password?
      </app-button>
    </div>

    <div class="login-form__button">
      <app-button type="submit" :primary="!hasError" :disabled="hasError">
        Login
      </app-button>
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
  .login-form__item {
    position: relative;
  }
  .toggle-password {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 20px;
    height: 20px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
  }
  .has-error :deep(.input) {
    border: 1px solid var(--red-500);
    border-radius: var(--radius-sm);
  }
  .error-message {
    color: var(--red-500);
    font-size: 12px;
  }
</style>
