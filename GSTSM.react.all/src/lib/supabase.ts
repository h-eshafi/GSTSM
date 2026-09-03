import { createClient } from '@supabase/supabase-js';

// TODO: Replace YOUR_ANON_KEY with your actual Supabase Anon Key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://eiekmthzsjinhchsvafb.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
