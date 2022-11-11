<script lang="ts">
	import { dateToString } from '$lib/helpers';
	import { addDays } from '$lib/helpers';
	import LinearProgress from '@smui/linear-progress';
	import DateTabs from '../attendance/DateTabs.svelte';
	import ResidencyTable from './ResidencyTable.svelte';

	const today = new Date();

	let activeDate: string = dateToString(today);
	let tabs: string[] = [...Array(5)].map((_, i) => dateToString(addDays(today, i - 2)));
  let isLoading = true;

  setTimeout(() => {
    isLoading = false
  }, 1000)
</script>

<DateTabs {tabs} bind:active={activeDate} />

{#if isLoading}
	<LinearProgress indeterminate />
{:else}
	<div class="table-wrapper"><ResidencyTable /></div>
{/if}

<style>
	.table-wrapper {
		display: flex;
		justify-content: center;
		margin-top: 30px;
		padding: 0 16px;
	}
</style>
