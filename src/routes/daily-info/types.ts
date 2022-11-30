export type DailyOccupantViewRecord = {
	samana_type: 'Bhikkhu' | 'Sayalay' | 'Samanera' | null;
	citizenship: number;
	citizenship_name: string;
	sex: 'm' | 'f';
	date: string;
	count: number;
};

export type DailyInfoPageData = {
	occupants: DailyOccupantViewRecord[];
	lastUpdate: string | null;
};
