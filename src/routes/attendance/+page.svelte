<script lang="ts">
	import { onMount } from 'svelte';

	import LinearProgress from '@smui/linear-progress';

	import DateTabs from './DateTabs.svelte';
	import PersonList from './PersonList.svelte';
	import { addDays, dateToString } from '$lib/helpers';

	let isLoading = true;
	
	const today = new Date();
	
	let activeDate: string = dateToString(today);
	let tabs: string[] = [...Array(5)].map((_, i) => dateToString(addDays(today, i-3)));

	onMount(() => {
		// Simulate loading
		setTimeout(() => {
			isLoading = false;
		}, 1000);
	});
</script>

<DateTabs {tabs} bind:active={activeDate} />
{#if isLoading}
	<LinearProgress indeterminate />
{:else}
	<PersonList />
{/if}
