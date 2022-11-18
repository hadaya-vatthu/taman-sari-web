import { createClient } from '@supabase/auth-helpers-sveltekit'
import { env } from '$env/dynamic/public'

if (!env.PUBLIC_SUPABASE_URL || !env.PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Env not loaded!');
}

export const supabaseClient = createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY)