<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { supabase } from '@/utils/supabase';
  import { useField, useForm } from 'vee-validate';
  import { object, string } from 'yup';
  import type { User } from '@supabase/supabase-js';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';
  import AppInput from '@/components/Inputs/AppInput.vue';

  const user = ref<User | null>(null);
  const originalUsername = ref<string>('');
  const isEditing = ref(false);
  const saving = ref(false);
  const successVisible = ref(false);

  const validationSchema = object({
    username: string()
      .required('Username is required')
      .min(2, 'Username must be at least 2 characters')
      .max(30, 'Username must not exceed 30 characters')
      .matches(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, hyphens, and underscores')
  });

  const { handleSubmit, resetForm, meta } = useForm({
    validationSchema,
    initialValues: {
      username: ''
    }
  });

  const { 
    value: username, 
    errorMessage: usernameError,
    handleChange: handleUsernameChange,
    handleBlur: handleUsernameBlur
  } = useField<string>('username');

  const canSave = computed(() => {
    return meta.value.dirty && meta.value.valid && !saving.value;
  });

  onMounted(async () => {
    await loadUserInfo();
  });

  async function loadUserInfo() {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      user.value = currentUser;

      if (currentUser) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', currentUser.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        const profileUsername = profile?.username || '';
        const emailUsername = currentUser.email?.split('@')[0] || '';
        
        const initialUsername = profileUsername || emailUsername;
        originalUsername.value = initialUsername;
        
        resetForm({
          values: {
            username: initialUsername
          }
        });
      }
    } catch (error) {
      console.error('Error loading user info:', error);
    }
  }

  function startEditing() {
    isEditing.value = true;
    setTimeout(() => {
      const input = document.querySelector('.user-info__input') as HTMLInputElement;
      input?.focus();
    }, 100);
  }

  function cancelEditing() {
    resetForm({
      values: {
        username: originalUsername.value
      }
    });
    isEditing.value = false;
  }

  async function validateUniqueness(usernameValue: string): Promise<boolean> {
    if (!user.value || usernameValue === originalUsername.value) {
      return true;
    }

    try {
      const { data: existingUser, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', usernameValue)
        .neq('id', user.value.id)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      return !existingUser;
    } catch (error) {
      console.error('Error checking username uniqueness:', error);
      return false;
    }
  }

  const saveUsername = handleSubmit(async (values) => {
    if (!user.value || !canSave.value) return;

    try {
      saving.value = true;
      const trimmedUsername = values.username.trim();

      const isUnique = await validateUniqueness(trimmedUsername);
      if (!isUnique) {
        alert('This username is already taken');
        return;
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: user.value.id,
          username: trimmedUsername,
          updated_at: new Date().toISOString()
        });

      if (updateError) throw updateError;

      originalUsername.value = trimmedUsername;
      isEditing.value = false;
      
      resetForm({
        values: { username: trimmedUsername }
      });
      
      showSuccessMessage();

    } catch (error) {
      console.error('Error saving username:', error);
      alert('There was an error saving your username');
    } finally {
      saving.value = false;
    }
  });

  function showSuccessMessage() {
    successVisible.value = true;
    setTimeout(() => {
      successVisible.value = false;
    }, 3000);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && canSave.value) {
      saveUsername();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  }

  function getDisplayEmail(): string {
    return user.value?.email || '';
  }
</script>

<template>
  <div class="user-info">
    <div v-if="user" class="user-info__body">
      <div class="user-info__content">
        <div class="user-info__title">Username</div>
        
        <div v-if="!isEditing" class="user-info__view">
          <span class="user-info__username">{{ username }}</span>
          <app-button 
            @click="startEditing"
            class="user-info__btn--edit"
          >
            <app-icon 
              name="edit" 
              size="20px" 
              color="var(--text-primary)"
            />
          </app-button>
        </div>
        
        <div v-else class="user-info__edit">
          <div class="user-info__row">
            <app-input
              v-model="username"
              @input="handleUsernameChange"
              @blur="handleUsernameBlur"
              @keydown="handleKeydown"
              class="user-info__input"
              :class="{ 'user-info__input--error': usernameError }"
              placeholder="Enter username"
              maxlength="20"
            />
            <div v-if="usernameError" class="user-info__error">
              {{ usernameError }}
            </div>
          </div>
          
          <div class="user-info__actions">
            <app-button 
              @click="saveUsername"
              :disabled="!canSave"
              class="user-info__actions--button"
              primary
            >
              Save
            </app-button>
            
            <app-button 
              @click="cancelEditing"
              :disabled="saving"
              class="user-info__actions--button"
              secondary
            >
              Cancel
            </app-button>
          </div>
        </div>
        <div 
          v-show="successVisible"
          class="user-info__success"
          :class="{ 'user-info__success--visible': successVisible }"
        >
          <app-icon name="check" size="16px" />
          Username updated successfully!
        </div>
      </div>

      <div class="user-info__item">
        <div class="user-info__title">Email</div>
        <div class="user-info__email">
          {{ getDisplayEmail() }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .user-info {
    margin-top: var(--space-sm);
    text-align: center;
  }
  .user-info__title {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-regular);
    color: var(--text-muted);
  }
  .user-info__username {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-regular);
    color: var(--text-primary);
  }
  .user-info__view {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  } 
  .user-info__btn--edit {
    max-width: 20px;
  }
  .user-info__input:deep(.input) {
    padding: 10px 10px;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-regular);
  }
  .user-info__error {
    color: var(--red-500);
    font-size: var(--font-size-xs);
  }
  .user-info__actions {
    margin-top: var(--space-xs);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .user-info__actions--button {
    height: var(--space-md);
    font-size: var(--font-size-sm);
  }
  .user-info__item {
    margin-top: var(--space-sm);
  }
  .user-info__email {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-regular);
    color: var(--text-primary);
  }
  .user-info__success {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: var(--green-400);
    font-size: var(--font-size-xs);
  }
</style>
