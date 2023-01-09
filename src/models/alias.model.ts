import type { PersonId } from './person.model';

type ENameAliasType = 'Samanera' | 'Salaya' | 'Bhikkhu' | 'Upasaka/ika';

export interface AliasRecord {
	readonly person_id: PersonId;
	readonly name_type: ENameAliasType;
	readonly alias: string;
}
