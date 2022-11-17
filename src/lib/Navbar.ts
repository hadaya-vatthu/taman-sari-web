import type { AuthSession } from "@supabase/supabase-js"

export type NavbarProps = {
  session: AuthSession | null
}