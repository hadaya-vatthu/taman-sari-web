// the person Id is actually a number
// type PersonId = number

// but Id recommend using an so called `opaque-type` to make it clear that e.g a person Id has nothing in common with a category Id, except of how they look like
declare const _personId: unique symbol;
export type PersonId = number & { readonly [_personId]: never };


export type Person = {
	birth_name: string;
	samana_type: 'Bhikkhu' | 'Samanera' | 'Sayalay' | null;
	citizenship?: number;
} 

export type PersonRecord = Person & {id: PersonId};

