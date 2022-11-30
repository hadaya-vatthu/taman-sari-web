import type { PageLoad } from './$types';
import { supabaseClient } from '$lib/supabaseClient';
import type { NameRecord } from 'src/models/person.model';

type FetchNamesData = Pick<NameRecord, 'id' | 'name' | 'birth_name'>[];

const fetchNames = async () => {
	const { data, error } = await supabaseClient
		.from('names')
		.select('id, name, birth_name')
		.order('id');
	if (error) throw error;
	return data as FetchNamesData;
};

export const load: PageLoad = async ({}) => {
	// `fetchPeople` return a promise so this will simply avoid waterfall issues.
	// See https://kit.svelte.dev/docs/load#parallel-loading
	return { names: fetchNames() };
};

export type AttendancePageData = {
	names: FetchNamesData;
};
