<script lang="ts">
	import { onMount } from 'svelte';

	import Textfield from '@smui/textfield';
	import Autocomplete from '@smui-extra/autocomplete';
	import { InitialFocus } from '@smui/dialog';
	import { Text } from '@smui/list';
	import LinearProgress from '@smui/linear-progress';

	import { supabaseClient } from '$lib/supabaseClient';

	import RadioField from './RadioField.svelte';
	import RadioItem from './RadioItem.svelte';
	import type { CountryState, FormValues } from './$types';

	export let fields: FormValues;

	let countriesState: CountryState = {
		loading: false,
		data: []
	};

	const fetchCountries = async (text: string) => {
		// TODO: create [server-side] helper function (API) that fetch countries
		// on the first time, cache them, and return sub search results.
		if (!countriesState.data.length) {
			countriesState.loading = true;
			let { data: countries, error } = await supabaseClient
				.from('countries')
				.select('id,name')
				.order('name');
			countriesState.loading = false;
			if (error) throw error;
			countriesState.data = countries ?? [];
		}

		return countriesState.data.filter((country) =>
			country.name.toLowerCase().includes(text.toLowerCase())
		);
	};
</script>

<Textfield
	type="text"
	style="width: 100%;"
	input$name="birth_name"
	label="Name"
	use={[InitialFocus]}
	required
	bind:value={fields.birth_name}
/>
<RadioField>
	{#each ['male', 'female'] as sex}
		<RadioItem label={sex} input$name="sex" value={sex[0]} group={fields.sex} />
	{/each}
</RadioField>
<Autocomplete
	label="Citizenship"
	search={fetchCountries}
	showMenuWithNoInput={false}
	bind:value={fields.citizenship}
	getOptionLabel={(country) => country?.name ?? ''}
	textfield$style="width: 100%;"
>
	<Text
		slot="loading"
		style="display: flex; width: 100%; justify-content: center; align-items: center;"
	>
		<LinearProgress indeterminate />
	</Text>
</Autocomplete>
<Textfield
	type="number"
	style="width: 100%;"
	input$name="birth_year"
	label="Born Year"
	bind:value={fields.birth_year}
/>
<Textfield
	type="text"
	style="width: 100%;"
	input$name="domicile"
	label="Domicile"
	bind:value={fields.domicile}
/>
