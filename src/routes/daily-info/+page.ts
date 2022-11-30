import { dateToISODateString } from '$lib/helpers';
import { supabaseClient } from '$lib/supabaseClient';
import type { PageLoad } from './$types';
import type { DailyOccupantViewRecord } from './types';

const fetchDailyOccupancy = async (dateString: string) => {
	const { data, error } = await supabaseClient
		.from('v_daily_occupant')
		.select()
		.eq('date', dateString);
	if (error) throw error;
	return data as DailyOccupantViewRecord[];
};

export const load: PageLoad = async ({ url }) => {
	let _date = url.searchParams.get('date');
	if (!_date) {
		const today = dateToISODateString(new Date());
		url.searchParams.set('date', today);
		_date = today;
	}

	return {
		occupants: fetchDailyOccupancy(_date)
	};
};
