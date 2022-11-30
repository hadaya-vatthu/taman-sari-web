import type { PageLoad } from './$types';
import { supabaseClient } from '$lib/supabaseClient';
import type { NameRecord, PersonId } from 'src/models/person.model';
import type { PresenceRecord } from 'src/models/presence.model';
import { addDays, dateToISODateString, getDateParam } from '$lib/helpers';

type FetchNamesData = Pick<NameRecord, 'id' | 'name' | 'birth_name'>[];

const fetchNames = async () => {
	const { data, error } = await supabaseClient
		.from('names')
		.select('id, name, birth_name')
		.order('id');
	if (error) throw error;
	return data as FetchNamesData;
};

type FetchPresencesByDateData = PresenceRecord[];

const fetchPresencesByDate = async (window: string[]) => {
	const { data, error } = await supabaseClient.from('presences').select().in('date', window);
	if (error) throw error;
	return data as FetchPresencesByDateData;
};

export const load: PageLoad = async ({ url }) => {
	// `fetchPeople` return a promise so this will simply avoid waterfall issues.
	// See https://kit.svelte.dev/docs/load#parallel-loading
	const windowSize = 5;

	const _activeDate = getDateParam(url);
	const activeDate = new Date(_activeDate);

	const dateWindow = [
		...Array(windowSize)
			.fill(0)
			.map((_, i) => dateToISODateString(addDays(activeDate, i - windowSize))),
		_activeDate
	];
	const [names, presences] = await Promise.all([fetchNames(), fetchPresencesByDate(dateWindow)]);

	const peopleIds = names.map((n) => n.id);

	const peopleDots = peopleIds
		.map((id) => {
			const dates = presences.filter((p) => p.person_id === id).map((p) => p.date);
			const dots = dateWindow.slice(0, windowSize).map((d) => dates.includes(d));
			return { id, dots };
		})
		.reduce((ob, { id, dots }) => ({ ...ob, [id]: dots }), {}) as { [id: number]: boolean[] };

	const orders = peopleIds
		.map((id) => {
			const dotsValues = peopleDots[id].map((d, i) => Number(d) * Math.pow(2, i));
			const sum = dotsValues.reduce((p, x) => p + x, 0);
			return { id, value: sum };
		})
		.sort((a, b) => b.value - a.value);

	const sortedNames = orders.map((o) => names.find((n) => n.id === o.id));

	return { names: sortedNames, presences, peopleDots, dateWindow, activeDate };
};

export type AttendancePageData = {
	names: FetchNamesData;
	presences: PresenceRecord[];
	peopleDots: { [id: PersonId]: boolean[] };
	dateWindow: string[];
	activeDate: Date;
};
