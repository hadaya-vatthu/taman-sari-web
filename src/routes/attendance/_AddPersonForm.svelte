<script lang="ts">
	import Textfield from '@smui/textfield';
	import Select, { Option } from '@smui/select';
	import { onMount } from 'svelte';
	import RadioField from './RadioField.svelte';
	import RadioItem from './RadioItem.svelte';
	import { InitialFocus } from '@smui/dialog';
	import type { CountryState, FormValues } from './$types';

	export let values: FormValues;

	let countriesState: CountryState = {
		loading: false,
		data: [
			{
				id: 110,
				name: 'Indonesia'
			},
			{
				id: 137,
				name: 'Myanmar'
			}
		]
	};

	onMount(async () => {
		// TODO: fetch countries
	})
</script>

<Textfield
	type="text"
	style="width: 100%;"
	input$name="birth_name"
	label="Name"
	use={[InitialFocus]}
	value={null}
/>
<RadioField>
	{#each ['male', 'female'] as sex}
		<RadioItem label={sex} input$name="sex" value={sex[0]} group={values.sex} />
	{/each}
</RadioField>
<Select
	label="Citizenship"
	style="width: 100%;"
	key={(country) => String(country.id)}
	name="citizenship"
	input$name="citizenship"
	bind:value={values.citizenship}
>
	{#each countriesState.data as country (country.id)}
		<Option value={country.id}>{country.name}</Option>
	{/each}
</Select>
<Textfield
	type="number"
	style="width: 100%;"
	input$name="birth_year"
	label="Born Year"
	bind:value={values.birth_year}
/>
<Textfield
	type="text"
	style="width: 100%;"
	input$name="domicile"
	label="Domicile"
	bind:value={values.domicile}
/>
