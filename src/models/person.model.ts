// the person Id is actually a number
// type PersonId = number

// but Id recommend using an so called `opaque-type` to make it clear that e.g a person Id has nothing in common with a category Id, except of how they look like
declare const _personId: unique symbol;
export type PersonId = number & { readonly [_personId]: never };

interface Person {
	birth_name: string;
	citizenship: number;
	id_card: string;
	birth_year: number;
	domicile: string;
	sex: 'm'|'f';
}

export interface PersonRecord extends Readonly<Person> {
	readonly id: PersonId;
}

interface Name {
	name: string;
	birth_name: string;
}

export interface NameRecord extends Readonly<Name> {
	readonly id: PersonId;
}
