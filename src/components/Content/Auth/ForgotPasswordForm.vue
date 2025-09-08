<script setup lang="ts">
  import { ref, computed } from 'vue';
  import AppInput from '@/components/Inputs/AppInput.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import { useAuthStore } from '@/stores/authStore';
  import { useForm, useField } from 'vee-validate';
  import * as yup from 'yup';

  const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'showError', message: string): void;
    (e: 'showSuccess', message: string): void;
  }>();

  const validationSchema = yup.object({
    email: yup.string()
      .required('Enter your email')
      .email('Invalid email format'),
  });
  const { handleSubmit } = useForm({ validationSchema });
  const { value: email, errorMessage: emailError } = useField<string>('email', undefined, { initialValue: '' });
  const hasError = computed(() => !!emailError.value);

  const loading = ref(false);
  const emailSent = ref(false);
  const authStore = useAuthStore();

  const onSubmit = handleSubmit(async () => {
    if (!email.value.trim()) {
      emit('showError', 'Please enter your email');
      return;
    }

    try {
      loading.value = true;
      const res = await authStore.resetPassword(email.value.trim());
    
      if (!res.success) {
        emit('showError', res.error ?? 'Password reset error');
      } else {
        emailSent.value = true;
        emit('showSuccess', 'Password reset email sent! Check your inbox.');
      }
    } catch (err: unknown) {
      emit('showError', err instanceof Error ? err.message : 'Password reset error');
    } finally {
      loading.value = false;
    }
  });

  const closeModal = () => {
    emit('close');
    email.value = '';
    emailSent.value = false;
    loading.value = false;
  };
</script>

<template>
  <form 
    v-if="!emailSent" 
    @submit.prevent="onSubmit"
    class="forgot-password"
  >
    <div class="forgot-password__item">
      <app-input 
        v-model="email" 
        type="email"
        placeholder="Email" 
        :disabled="loading"
        :class="{ 'has-error': emailError }" 
      />
      <span class="error-message">{{ emailError }}</span>
    </div>
          
    <div class="forgot-password__buttons">
      <app-button 
        type="submit" 
        :primary="!hasError"
        :disabled="hasError"
      >
        {{ loading ? 'Sending...' : 'Send Reset Link' }}
      </app-button>
            
      <app-button 
        secondary
        @click="closeModal" 
      >
        Cancel
      </app-button>
    </div>
  </form>

  <div v-else class="sent-password">
    <div class="sent-password__content">
      <app-title>Email Sent!</app-title>
      <p class="sent-password__message">
        We've sent a password reset link to <span>{{ email }}</span>
      </p>
    </div>
    <app-button @click="closeModal" primary>
      Close
    </app-button>
  </div>
</template>

<style scoped>
  .forgot-password > *:not(:last-child) {
    margin-bottom: var(--space-sm);
  }
  .forgot-password__buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 20px;
  }
  @media (max-width: 500px) {
    .forgot-password__buttons {
      flex-direction: column;
      row-gap: 10px;
    }
  }
  .sent-password > *:not(:last-child) {
    margin-bottom: var(--space-md);
  }
  .sent-password__message {
    margin-top: var(--space-xs);
    font-size: var(--font-size-md);
    color: var(--text-primary);
  }
  .sent-password__message span {
    color: var(--blue-400);
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
