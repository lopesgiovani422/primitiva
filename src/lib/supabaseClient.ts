import { createClient } from '@supabase/supabase-js';

// Essas variáveis devem ser configuradas no seu arquivo .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ Supabase credenciais não encontradas. Verifique seu .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
