import { supabaseClient } from '$lib/supabaseClient';
import type { DailyOccupantViewRecord } from './$types';

const fetchDailyOccupancy = async (dateString: string) => {
	const { data, error } = await supabaseClient
		.from('v_daily_occupant')
		.select()
		.eq('date', dateString);
	if (error) throw error;
	return data as DailyOccupantViewRecord[];
};

export const load = async () => {
	const _date = '2022-11-19';

	return {
		occupants: fetchDailyOccupancy(_date)
	};
};
