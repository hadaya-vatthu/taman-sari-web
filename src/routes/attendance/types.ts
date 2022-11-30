import type { NameRecord } from 'src/models/person.model';

export type CountryId = number;
export type CountryRecord = { id: CountryId } & { name: string };
export type CountryState = {
	loading: boolean;
	data: CountryRecord[];
};

export type FormValues = {
	birth_name: string;
	sex: string;
	citizenship: CountryRecord;
	birth_year: number | null;
	domicile: string | null;
};

type PersonListItem = Pick<NameRecord, 'id' | 'name'> & { dots: boolean[] };
export type PersonListItems = PersonListItem[];
