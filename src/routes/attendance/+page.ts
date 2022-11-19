import type { PageLoad } from './$types';
import { supabaseClient } from '$lib/supabaseClient';
import type { PersonRecord } from 'src/models/person.model';

const fetchPeople = async () => {
	const { data, error } = await supabaseClient
		.from('people')
		.select('id, birth_name, samana_type')
		.order('id');
	if (error) throw error;
	return data;
};



export const load: PageLoad = async ({}) => {
	// `fetchPeople` return a promise so this will simply avoid waterfall issues.
	// See https://kit.svelte.dev/docs/load#parallel-loading
	return { people: fetchPeople() };
};

export type AttendancePageData = {
	people: PersonRecord[];
};
