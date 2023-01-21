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
	import { t } from '$lib/translations';
	import Meta from '$lib/Meta.svelte';

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

	navbarTitle.set($t('daily-info.title'));
</script>

<Meta
	title={$t('daily-info.meta.title')}
	description={$t('daily-info.meta.description')}
	images={[
		// { src: './og-image_daily-info.png', width: 770, height: 420 },
		{ src: './og-image_daily-info_400x400.png', width: 400, height: 400 },
		// { src: './og-image_daily-info_wa.png', width: 290, height: 400 }
	]}
/>

<DateTabs {tabs} active={activeDate} on:change={handleChange} />

{#if isLoading}
	<LinearProgress indeterminate />
{:else}
	<div class="table-wrapper">
		<OccupantTable data={data.occupants} />
		<div class="last-update-wrapper">
			<pre>{$t('daily-info.last-update')}: </pre>
			{#if data.lastUpdate === null}
				<pre class="never">Never</pre>
			{:else}
				<pre>{data.lastUpdate}</pre>
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
		display: flex;
		flex-wrap: wrap;
	}
	pre {
		color: gray;
		margin: 0.5em 0 0 0;
	}
	.never {
		color: red;
		font-weight: 600;
	}
</style>
