import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const isConfigured = Boolean(supabaseUrl && supabaseKey && supabaseUrl !== 'your_supabase_url' && supabaseKey !== 'your_supabase_anon_key');

// Initialize with dummy values if missing to avoid immediate library crash, 
// but we will check 'isConfigured' before use.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseKey || 'placeholder'
);
