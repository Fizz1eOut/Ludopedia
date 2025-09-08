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
    (e: 'registerSuccess'): void;
  }>();

  const loading = ref(false);
  const authStore = useAuthStore();

  const validationSchema = yup.object({
    email: yup.string()
      .required('Enter your email')
      .email('Invalid email format'),
    password: yup.string().required('Enter your password').min(6, 'At least 6 characters'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm your password'),
  });

  const { handleSubmit } = useForm({ validationSchema });
  const { value: email, errorMessage: emailError } = useField('email', undefined, { initialValue: '' });
  const { value: password, errorMessage: passwordError } = useField('password', undefined, { initialValue: '' });
  const { value: confirmPassword, errorMessage: confirmPasswordError } = useField('confirmPassword', undefined, { initialValue: '' });

  const hasError = computed(() => !!emailError.value || !!passwordError.value || !!confirmPasswordError.value);

  const onSubmit = handleSubmit(async (values) => {
    try {
      loading.value = true;
      const res = await authStore.signUp({
        email: values.email,
        password: values.password,
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
  });

  const showPassword = ref(false);
  const showConfirmPassword = ref(false);
  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      showPassword.value = !showPassword.value;
    } else {
      showConfirmPassword.value = !showConfirmPassword.value;
    }
  };
</script>

<template>
  <form @submit.prevent="onSubmit" class="register-form">
    <div class="register-form__item">
      <app-input 
        v-model="email" 
        placeholder="Email"
        :class="{ 'has-error': emailError }"
      />
      <span class="error-message">{{ emailError }}</span>
    </div>
    <div class="register-form__item">
      <app-input 
        v-model="password" 
        :type="showPassword ? 'text' : 'password'" 
        placeholder="Password"
        :class="{ 'has-error': passwordError }"
      />
      <app-button 
        type="button"
        class="toggle-password" 
        @click="togglePasswordVisibility('password')"
      >
        <app-icon 
          :name="showPassword ? 'eye-off' : 'eye'" 
          size="20px" 
          style="color: var(--white)" 
        />
      </app-button>
      <span class="error-message">{{ passwordError }}</span>
    </div>
    <div class="register-form__item">
      <app-input 
        v-model="confirmPassword" 
        :type="showConfirmPassword ? 'text' : 'password'"
        placeholder="Confirm password"
        :class="{ 'has-error': confirmPasswordError }"
      />
      <app-button 
        type="button"
        class="toggle-password" 
        @click="togglePasswordVisibility('confirmPassword')"
      >
        <app-icon 
          :name="showConfirmPassword ? 'eye-off' : 'eye'" 
          size="20px" 
          style="color: var(--white)" 
        />
      </app-button>
      <span class="error-message">{{ confirmPasswordError }}</span>
    </div>

    <div class="register-form__button">
      <app-button type="submit" :primary="!hasError" :disabled="hasError">
        {{ loading ? 'Registering...' : 'Register' }}
      </app-button>
    </div>
  </form>
</template>

<style scoped>
  .register-form > *:not(:last-child) {
    margin-bottom: var(--space-sm);
  }
  .register-form__item {
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
