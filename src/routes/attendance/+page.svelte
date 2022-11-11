<script lang="ts">
	import { onMount } from 'svelte';
	import LinearProgress from '@smui/linear-progress';
	
	import PersonList from './PersonList.svelte';
	import DatePagination from './_DatePagination.svelte';

	let isLoading = true;	
	let activeDate = new Date();

	onMount(() => {
		// Simulate loading
		setTimeout(() => {
			isLoading = false;
		}, 1000);
	});
</script>

<svelte:head>
	<title>Attendance - Taman Sari</title>
</svelte:head>

<!-- <DateTabs {tabs} bind:active={activeDate} /> -->
<DatePagination bind:date={activeDate} />

{#if isLoading}
	<LinearProgress indeterminate />
{:else}
	<PersonList />
{/if}
