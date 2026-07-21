import { createClient } from '@supabase/supabase-js';

// Vercel aur Local Environment se keys lene ke liye
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing! Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file or Vercel Environment Variables.');
}

// Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
