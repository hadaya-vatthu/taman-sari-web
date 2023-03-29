import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import Joi from 'joi';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

type PostBody = {
	from: string;
	to:
		| string
		| {
				start: string;
				end: string;
		  };
};

const DatePattern = () => Joi.string().pattern(/\d{4}-\d{2}-\d{2}/);
const InsertOneSchema = DatePattern().required();
const InsertManySchema = Joi.object({
	start: DatePattern().required(),
	end: DatePattern().required()
});
const PostBodySchema = Joi.object({
	from: DatePattern().required(),
	to: Joi.alternatives([
		InsertOneSchema
		//  InsertManySchema
	]).required()
});

export const POST = (async (event) => {
	const body: PostBody = await event.request.json();
	try {
		Joi.assert(body, PostBodySchema);
	} catch (error) {
		return json(error, { status: 400 });
	}

	const { session, supabaseClient } = await getSupabase(event);
	if (!session) throw error(401, 'You are not logged in!');

	try {
		await supabaseClient.from('presences_old').delete().eq('date', body.to);

		const presences = await supabaseClient
			.from('presences_old')
			.select('person_id')
			.eq('date', body.from);
		if (presences.error) throw error;
		if (presences.data === null) return json(null);

		const insertReq = supabaseClient.from('presences_old');
		if (typeof body.to === 'string') {
			const result = await insertReq
				.insert(presences.data?.map(({ person_id }) => ({ person_id, date: body.to })))
				.select();
			return json(result.data);
		}
	} catch (error) {
		return json(error, { status: 500 });
	}
	throw error(501, 'Ranged `to` is not yet implemented');
}) satisfies RequestHandler;
