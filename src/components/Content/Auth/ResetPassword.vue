<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import AppInput from '@/components/Inputs/AppInput.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import { supabase } from '@/utils/supabase';
  import { useRouter } from 'vue-router';

  const password = ref('');
  const confirmPassword = ref('');
  const router = useRouter();
  const sessionReady = ref(false);
  const error = ref('');

  function getResetParams() {
    const fullHash = window.location.hash.slice(1);
    const parts = fullHash.split('#');
    const queryString = parts[parts.length - 1];
    const hashParams = new URLSearchParams(queryString);

    return {
      accessToken: hashParams.get('access_token'),
      refreshToken: hashParams.get('refresh_token'),
      type: hashParams.get('type'),
      error: hashParams.get('error'),
      errorCode: hashParams.get('error_code'),
      errorDescription: hashParams.get('error_description'),
    };
  }

  async function validateResetLink() {
    const params = getResetParams();

    if (params.error) {
      error.value =
        params.errorDescription || 'Reset link has expired. Please request a new one.';
      return;
    }

    if (params.type === 'recovery' && params.accessToken && params.refreshToken) {
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: params.accessToken,
        refresh_token: params.refreshToken,
      });

      if (sessionError) {
        error.value = 'Invalid reset link.';
      } else {
        sessionReady.value = true;
      }
    } else {
      error.value = 'Invalid reset link format.';
    }
  }

  async function handleUpdate() {
    if (password.value !== confirmPassword.value) {
      error.value = 'Passwords don\'t match';
      return;
    }

    if (password.value.length < 6) {
      error.value = 'Password must be at least 6 characters';
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: password.value,
    });

    if (!updateError) {
      alert('Password updated successfully!');
      router.push('/');
    } else {
      error.value = updateError.message;
    }
  }

  onMounted(() => {
    validateResetLink();
  });
</script>


<template>
  <div class="reset-password">
    <app-title>Set new password</app-title>

    <div v-if="error" class="reset-password__error">
      {{ error }}
    </div>

    <div v-if="sessionReady" class="reset-password__items">
      <div class="reset-password__item">
        <app-input
          type="password"
          v-model="password"
          placeholder="New password"
        />
      </div>
      <div class="reset-password__item">
        <app-input
          type="password"
          v-model="confirmPassword"
          placeholder="Confirm password"
        />
      </div>
      <div class="reset-password__button">
        <app-button primary @click="handleUpdate">
          Update password
        </app-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .reset-password {
    margin-top: var(--space-md);
  }
  .reset-password__error {
    color: var(--red-500);
  }
  .reset-password__items {
    margin-top: var(--space-md);
  }
  .reset-password__items > *:not(:last-child) {
    margin-bottom: var(--space-sm);
  }
</style>
