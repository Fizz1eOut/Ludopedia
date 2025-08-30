<script setup lang="ts">
  import { ref } from 'vue';
  import AppInput from '@/components/Inputs/AppInput.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import { useAuthStore } from '@/stores/authStore';

  const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'showError', message: string): void;
    (e: 'showSuccess', message: string): void;
  }>();

  const email = ref('');
  const loading = ref(false);
  const emailSent = ref(false);
  const authStore = useAuthStore();

  const resetPassword = async () => {
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
  };

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
    @submit.prevent="resetPassword"
    class="forgot-password"
  >
    <div class="forgot-password__item">
      <app-input 
        v-model="email" 
        type="email"
        placeholder="Email" 
        :disabled="loading"
      />
    </div>
          
    <div class="forgot-password__buttons">
      <app-button 
        type="submit" 
        primary 
        :disabled="loading || !email.trim()"
      >
        {{ loading ? 'Sending...' : 'Send Reset Link' }}
      </app-button>
            
      <app-button 
        secondary
        @click="closeModal" 
        :disabled="loading"
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
</style>
