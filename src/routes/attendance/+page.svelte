<script lang="ts">
	import { onMount } from 'svelte';

	import LinearProgress from '@smui/linear-progress';

	import { navbarTitle } from '$lib/stores';
	import { addDays, dateToISODateString } from '$lib/helpers';
	import { supabaseClient } from '$lib/supabaseClient';

	import type { PresenceRecord } from 'src/models/presence.model';

	import type { AttendancePageData } from './+page';
	import PersonList from './_PersonList.svelte';
	import DatePagination from './_DatePagination.svelte';
	import AddPersonFab from './_AddPersonFAB.svelte';
	import AddPersonDialog from './_AddPersonDialog.svelte';

	const windowSize = 5;

	export let data: AttendancePageData;

	// let activeDate = new Date();
	// let presences: PresenceRecord[] = [];
	let dirties: number[] = [];
	let loading = false;
	let open = false;
	let isMounted = false;

	$: disabled = !!dirties.length;

	// $: dateWindow = [...Array(windowSize)].map((_, i) =>
	// 	dateToISODateString(addDays(activeDate, i - windowSize))
	// );
	// // $: fetchPresencesByDate(dateWindow).then((data) => (presences = data));

	$: _activeDate = data.dateWindow[windowSize];
	$: todaysPresences = data.presences.filter((p) => p.date === _activeDate);
	$: selected = todaysPresences.map((p) => p.person_id);

	$: personListItems = data.names.map(p => ({...p, dots: data.peopleDots[p.id]}))
	// $: nameRecords = data.names;


	// const fetchPresencesByDate = async (window: string[]) => {
	// 	try {
	// 		loading = true;
	// 		// const now = dateToISODateString(date);
	// 		// const prev = dateToISODateString(addDays(date, -5));
	// 		const { data, error } = await supabaseClient.from('presences').select().in('date', window);
	// 		// .gt('date', prev)
	// 		// .lte('date', now);
	// 		if (error) throw error;
	// 		return data as PresenceRecord[];
	// 	} catch (error) {
	// 		console.error(error);
	// 		if (error instanceof Error) alert(error.message);
	// 		return [];
	// 	} finally {
	// 		loading = false;
	// 	}
	// };

	type SelectionChangeEvent = CustomEvent<{ person_id: number; checked: boolean }[]>;
	const handleSelectionChange = async (event: SelectionChangeEvent) => {
		const changes = event?.detail;
		const _date = dateToISODateString(data.activeDate);

		if (changes) {
			const deleteTargets = changes.filter((c) => !c.checked).map((t) => t.person_id);
			const insertTargets = changes
				.filter((c) => c.checked)
				.map((c) => ({ person_id: c.person_id, date: _date }));

			const insertPromise = async () => {
				if (!insertTargets.length) return [];
				const { data, error } = await supabaseClient
					.from('presences')
					.insert(insertTargets)
					.select();
				if (error) throw error;
				return data as PresenceRecord[];
			};

			const deletePromise = async () => {
				if (!deleteTargets.length) return [];
				const { data, error } = await supabaseClient
					.from('presences')
					.delete()
					.eq('date', _date)
					.eq('person_id', deleteTargets)
					.select();
				if (error) throw error;
				return data as PresenceRecord[];
			};

			const changes_person_ids = changes.map((c) => c.person_id);
			try {
				dirties = [...dirties, ...changes_person_ids];
				// const results = 
				await Promise.all([insertPromise(), deletePromise()]);
				
				// const newPresences = [
				// 	...data.presences.filter((p) => p.date !== _activeDate),
				// 	...todaysPresences.filter((p) => selected.includes(p.person_id)),
				// 	...results[0]
				// ];
			} catch (error) {
				console.error(error);
				if (error instanceof Error) {
					alert(error.message);
				}
			} finally {
				dirties = dirties.filter((d) => !changes_person_ids.includes(d));
			}
		}
	};

	navbarTitle.set('Attendance Management');

	onMount(async () => {
		// const presenceSubs = supabaseClient
		// 	.channel('custom-all-channel')
		// 	.on('postgres_changes', { event: '*', schema: 'public', table: 'presences' }, (payload) => {
		// 		console.log('Change received!', payload);
		// 	})
		// 	.subscribe();
		isMounted = true;
		// try {
		// presences = await fetchPresencesByDate(activeDate);
		// presences = await fetchPresencesByDate(dateWindow);
		// } catch (error) {
		// 	console.error(error);
		// 	if (error instanceof Error) {
		// 		alert(error.message);
		// 	}
		// }

		return () => {
			isMounted = false;
			// presenceSubs.unsubscribe();
		};
	});
</script>

<svelte:head>
	<title>Attendance - Taman Sari</title>
</svelte:head>

<DatePagination date={data.activeDate} {disabled} />
{#if loading}
	<LinearProgress indeterminate />
{/if}
<PersonList
	items={personListItems}
	{selected}
	{dirties}
	on:selectionChange={handleSelectionChange}
/>

{#if isMounted}
	<AddPersonFab autoHide on:click={() => (open = !open)} />
	<AddPersonDialog bind:open />
{/if}
