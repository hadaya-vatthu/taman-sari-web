<script lang="ts">
	import PersonList from './_PersonList.svelte';
	import DatePagination from './_DatePagination.svelte';
	import { navbarTitle } from '$lib/stores';
	import type { AttendancePageData } from './+page';
	import { onMount } from 'svelte';
	import { supabaseClient } from '$lib/supabaseClient';
	import type { PresenceRecord } from 'src/models/presence.model';

	export let data: AttendancePageData;

	let activeDate = new Date();
	let presences: PresenceRecord[] = [];
	let dirties: number[] = [];

	$: personList = data.people;
	$: {
		fetchPresencesByDate(activeDate)
			.then((data) => (presences = data))
			.catch(console.error);
	}
	$: selected = presences.map((p) => p.person_id);
	$: disabled = !!dirties.length;

	const fetchPresencesByDate = async (date: Date) => {
		const _date = date.toISOString();
		const { data, error } = await supabaseClient.from('presences').select().eq('date', _date);
		if (error) throw error;
		return data;
	};

	type SelectionChangeEvent = CustomEvent<{ person_id: number; checked: boolean }[]>;
	const handleSelectionChange = async (event: SelectionChangeEvent) => {
		const changes = event?.detail;
		const _date = activeDate.toISOString();

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
				const results = await Promise.all([insertPromise(), deletePromise()]);
				presences = [...presences.filter((p) => selected.includes(p.person_id)), ...results[0]];
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

		try {
			presences = await fetchPresencesByDate(activeDate);
		} catch (error) {
			console.error(error);
			if (error instanceof Error) {
				alert(error.message);
			}
		}

		return () => {
			// presenceSubs.unsubscribe();
		};
	});
</script>

<svelte:head>
	<title>Attendance - Taman Sari</title>
</svelte:head>

<DatePagination bind:date={activeDate} {disabled} />
<PersonList {personList} {selected} {dirties} on:selectionChange={handleSelectionChange} />
