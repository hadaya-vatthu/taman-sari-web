<script lang="ts">
	import { onMount } from 'svelte';
	import LinearProgress from '@smui/linear-progress';

	import { personSlice } from '$lib/stores';

	import PersonList from './PersonList.svelte';
	import DatePagination from './_DatePagination.svelte';
	import { navbarTitle } from '$lib/stores';
	import { supabaseClient } from '$lib/supabaseClient';

	let activeDate = new Date();
	$: loading = $personSlice.status === 'loading';

	const fetchPeople = async () => {
		if ($personSlice.status !== 'idle') return;

		try {
			personSlice.update((s) => ({ ...s, status: 'loading' }));
			const { data, error } = await supabaseClient
				.from('people')
				.select('id, birth_name, samana_type')
				.order('id');
			if (error) throw error;
			personSlice.update((s) => ({ ...s, status: 'completed', data: data ?? [] }));
		} catch (error) {
			console.error(error);
			personSlice.update((s) => ({ ...s, error: error, status: 'error' }));
		}
	};

	navbarTitle.set('Attendance Management');

	onMount(() => {
		fetchPeople();
	});
</script>

<svelte:head>
	<title>Attendance - Taman Sari</title>
</svelte:head>

<DatePagination bind:date={activeDate} />

{#if loading}
	<LinearProgress indeterminate />
{:else}
	<PersonList />
{/if}
