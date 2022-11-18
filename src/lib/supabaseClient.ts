import { createClient } from '@supabase/auth-helpers-sveltekit';
import * as env from '$env/static/public';

export const supabaseClient = createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY);
