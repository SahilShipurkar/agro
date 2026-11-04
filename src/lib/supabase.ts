import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yzcepyufinmljrpqkjpe.supabase.co';
// Ensure any accidental /rest/v1 or trailing slashes are cleanly stripped
export const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
export const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseAnonKey && supabaseAnonKey !== 'placeholder-key'
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey || 'placeholder-key');
