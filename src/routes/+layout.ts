import type { LayoutLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { NavbarProps } from '$lib/Navbar';
import { sessionSt } from '$lib/stores';
import { locale, loadTranslations } from '$lib/translations';
import type { ServerLoadEvent, LoadEvent, RequestEvent } from '@sveltejs/kit';

const loadSession = async (event: RequestEvent | ServerLoadEvent | LoadEvent) => {
	const { session } = await getSupabase(event);
	sessionSt.set(session);
	return session;
};

export const load: LayoutLoad = async (event) => {
	// Initialize translations
	const { pathname } = event.url;
	const defaultLocale = 'id'; // get from cookie, user session, ...
	const initLocale = locale.get() || defaultLocale; // set default if no locale already set

	await loadTranslations(initLocale, pathname); // keep this just before the `return`

	return { session: loadSession(event), initLocale };
};

export type LayoutData = {
	session: NavbarProps['session'];
	initLocale: string;
};
