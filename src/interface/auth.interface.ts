import type { User, Session } from '@supabase/supabase-js';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
}

export interface CustomAuthResponse {
  success: boolean;
  data?: { user: User | null; session: Session | null; } | null;
  error?: string;
}
