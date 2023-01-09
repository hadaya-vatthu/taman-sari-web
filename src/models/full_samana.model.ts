import type { AliasRecord } from './alias.model';
import type { PersonRecord } from './person.model';
import type { SamanaRecord } from './samana.model';

export interface FullSamanaRecord
	extends Pick<
		PersonRecord & SamanaRecord,
		| 'id'
		| 'birth_name'
		| 'samana_type'
		| 'ordination_year'
		| 'sex'
		| 'citizenship'
		| 'id_card'
		| 'birth_year'
	> {
	readonly name: AliasRecord['alias'];
}
