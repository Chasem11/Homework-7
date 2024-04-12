import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rrxgnavjfppseobprdcr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyeGduYXZqZnBwc2VvYnByZGNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5NTM3NTIsImV4cCI6MjAyODUyOTc1Mn0.Y0Hbgshs6hhsiOgCwk3w-Gg3hKtf-fmszUq3-w15QDE';
export const supabase = createClient(supabaseUrl, supabaseKey);
