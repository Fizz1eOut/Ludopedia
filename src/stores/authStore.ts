import { defineStore } from 'pinia';
import { ref, computed, readonly } from 'vue';
import { supabase } from '@/utils/supabase';
import type { User } from '@supabase/supabase-js';
import type { LoginCredentials, RegisterCredentials, CustomAuthResponse } from '@/interface/auth.interface';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed<boolean>(() => !!user.value);
  const userId = computed<string | undefined>(() => user.value?.id);
  const userEmail = computed<string | undefined>(() => user.value?.email);

  const clearError = (): void => {
    error.value = null;
  };

  const signUp = async (credentials: RegisterCredentials): Promise<CustomAuthResponse> => {
    // console.log('[AuthStore] signUp →', credentials.email);
    try {
      loading.value = true;
      error.value = null;
    
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
      });
      // console.log('[SIGNUP] data:', data, 'error:', signUpError);
      if (signUpError) throw signUpError;
    
      user.value = data.user;
      // console.log('[AuthStore] signUp success →', data);
      return { success: true, data };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Registration error';
      // console.error('[AuthStore] signUp error →', errorMessage);
      error.value = errorMessage;
      return { success: false, error: errorMessage };
    } finally {
      loading.value = false;
    }
  };


  const signIn = async (credentials: LoginCredentials): Promise<CustomAuthResponse> => {
    // console.log('[AuthStore] signIn attempt →', credentials.email);
    try {
      loading.value = true;
      error.value = null;
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: credentials.email.trim(),
        password: credentials.password
      });
      
      // console.log('[AuthStore] Full response:', { data, error: signInError });
      
      if (signInError) throw signInError;

      user.value = data.user;
      // console.log('[AuthStore] Login successful, user set:', user.value?.email);
      return { success: true, data };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Exit error';
      // console.error('[AuthStore] signIn error →', errorMessage, err);
      error.value = errorMessage;
      return { success: false, error: errorMessage };
    } finally {
      loading.value = false;
    }
  };

  const signOut = async (): Promise<void> => {
    // console.log('[AuthStore] signOut');
    try {
      loading.value = true;
      const { error: signOutError } = await supabase.auth.signOut();
      
      if (signOutError) throw signOutError;
      
      user.value = null;
      // console.log('[AuthStore] signOut success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Exit error';
      // console.error('[AuthStore] signOut error →', msg);
      error.value = msg;
    } finally {
      loading.value = false;
    }
  };

  const getCurrentUser = async (): Promise<User | null> => {
    // console.log('[AuthStore] getCurrentUser');

    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      user.value = currentUser;
      // console.log('[AuthStore] currentUser →', currentUser);
      return currentUser;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error getting user';
      // console.error('[AuthStore] getCurrentUser error →', msg);
      error.value = msg;
      return null;
    }
  };

  const initialize = async (): Promise<void> => {
    // console.log('[AuthStore] initialize');
    await getCurrentUser();
    
    supabase.auth.onAuthStateChange((event, session) => {
      // console.log('[AuthStore] onAuthStateChange →', event, session?.user);
      user.value = session?.user || null;
    });
  };

  const resetPassword = async (email: string): Promise<CustomAuthResponse> => {
    try {
      loading.value = true;
      error.value = null;
      const redirectUrl = `${window.location.origin}/Ludopedia/#/reset-password`;
    
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl
      });

      if (resetError) throw resetError;
      return { success: true, data: null };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Password reset error';
      error.value = errorMessage;
      return { success: false, error: errorMessage };
    } finally {
      loading.value = false;
    }
  };

  return {
    user: readonly(user),
    loading: readonly(loading),
    error: readonly(error),
    
    isAuthenticated,
    userId,
    userEmail,

    clearError,
    signUp,
    signIn,
    signOut,
    getCurrentUser,
    initialize,
    resetPassword
  };
});
