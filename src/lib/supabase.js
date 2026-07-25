// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate that credentials are real (not placeholder text)
const isValidUrl = supabaseUrl && supabaseUrl.startsWith('https://');
const isValidKey = supabaseAnonKey && supabaseAnonKey.length > 20;

if (!isValidUrl || !isValidKey) {
  console.warn('Supabase credentials not found or invalid. Database features will be disabled.');
}

let supabaseClient = null;
try {
  if (isValidUrl && isValidKey) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  }
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
  supabaseClient = null;
}

export const supabase = supabaseClient;

// Check connection
export const checkConnection = async () => {
  if (!supabase) return false;
  
  try {
    const { error } = await supabase.from('projects').select('count');
    return !error;
  } catch (err) {
    console.error('Supabase connection error:', err);
    return false;
  }
};

