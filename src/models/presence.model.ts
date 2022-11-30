// the person Id is actually a number
// type PersonId = number

import type { PersonId } from './person.model';

// but Id recommend using an so called `opaque-type` to make it clear that e.g a person Id has nothing in common with a category Id, except of how they look like
declare const _presenceId: unique symbol;
export type PresenceId = number & { readonly [_presenceId]: never };

export type Presence = {
	person_id: PersonId;
	date: string | Date;
	created_at: Date;
};

export type PresenceRecord = Presence;
