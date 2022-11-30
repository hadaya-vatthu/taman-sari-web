<script lang="ts">
	import { dateToISODateString } from '$lib/helpers';
	import { addDays } from '$lib/helpers';
	import { navbarTitle } from '$lib/stores';
	import LinearProgress from '@smui/linear-progress';
	import DateTabs from './DateTabs.svelte';
	import type { DailyInfoPageData } from './types';
	import OccupantTable from './OccupantTable.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data: DailyInfoPageData;

	let activeDate: string = $page.url.searchParams.get('date') || dateToISODateString(new Date());
	let isLoading = false;

	$: date = new Date(activeDate);
	$: tabs = [...Array(7)].map((_, i) => dateToISODateString(addDays(date, i - 2)));

	const handleChange = (e: CustomEvent<string>) => {
		const date = e.detail;
		const searchParams = new URLSearchParams($page.url.searchParams);
		searchParams.set('date', date);
		goto(`?${searchParams.toString()}`);
	};

	navbarTitle.set('Daily Information');
</script>

<DateTabs {tabs} active={activeDate} on:change={handleChange} />

{#if isLoading}
	<LinearProgress indeterminate />
{:else}
	<div class="table-wrapper">
		<OccupantTable data={data.occupants} />
		<div class="last-update-wrapper">
			{#if data.lastUpdate === null}
				<pre>Last update: <span class="never">Never</span></pre>
			{:else}
				<pre>Last update: {data.lastUpdate}</pre>
			{/if}
		</div>
	</div>
{/if}

<style>
	.table-wrapper {
		display: flex;
		max-width: 480px; /* Table max-width */
		flex-direction: column;
		align-items: center;
		margin: 8px auto;
		padding: 0 16px;
	}
	.last-update-wrapper {
		width: 100%;
	}
	pre {
		color: gray;
		margin-top: 0.5em;
	}
	.never {
		color: red;
		font-weight: 600;
	}
</style>
