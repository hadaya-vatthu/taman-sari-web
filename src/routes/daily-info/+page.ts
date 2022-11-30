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

const fetchLastUpdate = async (dateString: string) => {
	const { data, error } = await supabaseClient
		.from('daily_updates')
		.select('last_update')
		.eq('date', dateString)
		.single();
	if (error) {
		if (error.code === 'PGRST116') return null
		throw error;
	}
	if (!data) return null;

	const lastUpdate = new Date(data.last_update).toLocaleString();
	return lastUpdate;
};

export const load: PageLoad = async ({ url }) => {
	let _date = url.searchParams.get('date');
	if (!_date) {
		const today = dateToISODateString(new Date());
		url.searchParams.set('date', today);
		_date = today;
	}

	return {
		occupants: fetchDailyOccupancy(_date),
		lastUpdate: fetchLastUpdate(_date)
	};
};
