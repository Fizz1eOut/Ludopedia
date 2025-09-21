<script setup lang="ts">
  import { ref, computed } from 'vue';
  import AppInput from '@/components/Inputs/AppInput.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import { useForm, useField } from 'vee-validate';
  import * as yup from 'yup';
  import { useAuthStore } from '@/stores/authStore';
  import { supabase } from '@/utils/supabase';

  const emit = defineEmits<{
    (e: 'success', message: string): void;
    (e: 'error', message: string): void;
    (e: 'close'): void;
  }>();

  const authStore = useAuthStore();

  const validationSchema = yup.object({
    currentPassword: yup.string().required('Enter current password'),
    newPassword: yup.string().required('Enter new password').min(6, 'At least 6 characters'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'Passwords must match')
      .required('Confirm new password'),
  });

  const { handleSubmit } = useForm({ validationSchema });
  const { value: currentPassword, errorMessage: currentPasswordError } = useField('currentPassword', undefined, { initialValue: '' });
  const { value: newPassword, errorMessage: newPasswordError } = useField('newPassword', undefined, { initialValue: '' });
  const { value: confirmPassword, errorMessage: confirmPasswordError } = useField('confirmPassword', undefined, { initialValue: '' });

  const hasError = computed(
    () => !!currentPasswordError.value || !!newPasswordError.value || !!confirmPasswordError.value
  );

  const loading = ref(false);

  const onSubmit = handleSubmit(async (values) => {
    try {
      loading.value = true;

      const email = authStore.userEmail;
      if (!email) {
        emit('error', 'No user email found.');
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: values.currentPassword,
      });

      if (signInError) {
        emit('error', 'Current password is incorrect.');
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: values.newPassword,
      });

      if (updateError) {
        emit('error', updateError.message);
      } else {
        emit('success', 'Password updated successfully!');
      }
    } catch (err: unknown) {
      emit('error', err instanceof Error ? err.message : 'Password update error');
    } finally {
      loading.value = false;
    }
  });

  const showCurrentPassword = ref(false);
  const showNewPassword = ref(false);
  const showConfirmPassword = ref(false);

  const togglePasswordVisibility = (field: 'currentPassword' | 'newPassword' | 'confirmPassword') => {
    if (field === 'currentPassword') {
      showCurrentPassword.value = !showCurrentPassword.value;
    } else if (field === 'newPassword') {
      showNewPassword.value = !showNewPassword.value;
    } else if (field === 'confirmPassword') {
      showConfirmPassword.value = !showConfirmPassword.value;
    }
  };
</script>

<template>
  <form @submit.prevent="onSubmit" class="change-password-form">
    <div class="change-password-form__header">
      <app-title>
        Change Password
      </app-title>

      <app-button class="change-password-form__close" @click="$emit('close')">
        <app-icon
          name="cross"
          size="20px"
          style="color: var(--white)"
        />
      </app-button>
    </div>

    <div class="change-password-form__body">
      <div class="change-password-form__item">
        <app-input
          :type="showCurrentPassword ? 'text' : 'password'" 
          placeholder="Current password"
          v-model="currentPassword"
          :class="{ 'has-error': currentPasswordError }"
        />
        <app-button 
          type="button"
          class="toggle-password" 
          @click="togglePasswordVisibility('currentPassword')"
        >
          <app-icon 
            :name="showCurrentPassword ? 'eye-off' : 'eye'" 
            size="20px" 
            style="color: var(--white)" 
          />
        </app-button>
        <span class="error-message">{{ currentPasswordError }}</span>
      </div>

      <div class="change-password-form__item">
        <app-input
          :type="showNewPassword ? 'text' : 'password'" 
          placeholder="New password"
          v-model="newPassword"
          :class="{ 'has-error': newPasswordError }"
        />
        <app-button 
          type="button"
          class="toggle-password" 
          @click="togglePasswordVisibility('newPassword')"
        >
          <app-icon 
            :name="showNewPassword ? 'eye-off' : 'eye'" 
            size="20px" 
            style="color: var(--white)" 
          />
        </app-button>
        <span class="error-message">{{ newPasswordError }}</span>
      </div>

      <div class="change-password-form__item">
        <app-input
          :type="showConfirmPassword ? 'text' : 'password'" 
          placeholder="Confirm new password"
          v-model="confirmPassword"
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

      <div class="change-password-form__button">
        <app-button :primary="!hasError" :disabled="hasError || loading" type="submit">
          {{ loading ? 'Updating...' : 'Update password' }}
        </app-button>
      </div>
    </div>
  </form>
</template>

<style scoped>
  .change-password-form__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-bottom: var(--space-md)
  }
  .change-password-form__close {
    max-width: 20px;
  }
  .change-password-form__body > *:not(:last-child) {
    margin-bottom: var(--space-sm);
  }
  .change-password-form__item {
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
