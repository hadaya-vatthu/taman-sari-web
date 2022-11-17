import type { LayoutLoad } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import type { NavbarProps } from '$lib/Navbar'
import { sessionSt } from '$lib/stores'

export const load: LayoutLoad = async (event) => {
  const { session } = await getSupabase(event)
  sessionSt.set(session);
  return { session }
}

export type LayoutData = {
  session: NavbarProps['session']
}