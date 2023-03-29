import type { PageLoad } from './$types';
import { supabaseClient } from '$lib/supabaseClient';
import type { NameRecord, PersonId } from 'src/models/person.model';
import type { PresenceRecord } from 'src/models/presence.model';
import { addDays, dateToISODateString, getDateParam } from '$lib/helpers';
import type { FullSamanaRecord } from 'src/models/full_samana.model';

type FetchPeopleData = Pick<FullSamanaRecord, 'id' | 'name' | 'birth_name' | 'samana_type'>[];
type FetchPresencesByDateData = PresenceRecord[];

const fetchPeople = async () => {
	const { data, error } = await supabaseClient
		.from('full_people')
		.select('id, name, birth_name, samana_type');
	if (error) throw error;
	return data as FetchPeopleData;
};

const fetchPresencesByDate = async (window: string[]) => {
	const { data, error } = await supabaseClient.from('presences_old').select().in('date', window);
	if (error) throw error;
	return data as FetchPresencesByDateData;
};

export const load: PageLoad = async ({ url, depends }) => {
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
	const [names, presences] = await Promise.all([fetchPeople(), fetchPresencesByDate(dateWindow)]);

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

	// Re-run `load` if `invalidate('app:presences')` is called.
	depends('app:presences');

	return { names: sortedNames, presences, peopleDots, dateWindow, activeDate };
};

export type AttendancePageData = {
	names: FetchPeopleData;
	presences: PresenceRecord[];
	peopleDots: { [id: PersonId]: boolean[] };
	dateWindow: string[];
	activeDate: Date;
};
