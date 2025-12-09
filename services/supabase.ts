import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ajlvmieyoozzrjdygoym.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqbHZtaWV5b296enJqZHlnb3ltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNzI2MDQsImV4cCI6MjA4MDg0ODYwNH0.-yRKQYa7br3ItvMtVSfC0Crq9ohEEnmsHaTXrIDrcW0';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);