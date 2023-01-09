import type { PersonId } from "./person.model";

export type EnumSamanaType = 'Bhikkhu' | 'Samanera' | 'Sayalay'

export interface SamanaRecord {
  readonly id: PersonId;
  readonly samana_type: EnumSamanaType;
  readonly ordination_year?: number;
}
