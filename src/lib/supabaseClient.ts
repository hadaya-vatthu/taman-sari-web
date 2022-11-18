import { createClient } from '@supabase/auth-helpers-sveltekit';
import * as env from '$env/static/public';

if (!env.PUBLIC_SUPABASE_URL || !env.PUBLIC_SUPABASE_ANON_KEY) {
	console.error({
		PUBLIC_SUPABASE_URL: env.PUBLIC_SUPABASE_URL,
		PUBLIC_SUPABASE_ANON_KEY: env.PUBLIC_SUPABASE_ANON_KEY
	});
  console.debug(env)
	throw new Error('Env not loaded!');
}

export const supabaseClient = createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY);
