<script lang="ts">
	import Tab, { Label } from '@smui/tab/src';
	import TabBar from '@smui/tab-bar/src';
	import { createEventDispatcher, onMount } from 'svelte';
	import { dateToString } from '$lib/helpers';
	import { prefetch } from '$app/navigation';

	export let tabs: string[] = [];
	export let active: string;

	let isMounted = false;

	const dispatch = createEventDispatcher();

	onMount(() => {
		isMounted = true;
	});
</script>

{#if isMounted}
	<TabBar {tabs} let:tab {active}>
		<Tab {tab} on:click={() => dispatch('change', tab)}
			on:mouseover={() => prefetch('/daily-info?date='+tab)}>
			<Label
				>{tab
					.split('-')
					.reverse()
					.filter((_, i) => i < 2)
					.join('/')}</Label
			>
		</Tab>
	</TabBar>
{/if}
