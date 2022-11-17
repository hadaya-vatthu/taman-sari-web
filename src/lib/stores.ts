import type { AuthSession, PostgrestError } from "@supabase/supabase-js";
import type { PersonRecord } from "src/models/person.model";
import { writable } from "svelte/store";

export const navbarTitle = writable<string>('Taman Sari')


type PersonSlice = {
  status: 'idle'|'loading'|'completed'|'error';
  data: PersonRecord[];
  error?: unknown;
}

export const personSlice = writable<PersonSlice>({
  status: 'idle',
  data: []
})

export const sessionSt = writable<AuthSession | null>(null);