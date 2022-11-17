<script lang="ts">
	import Tab, { Label } from '@smui/tab/src';
	import TabBar from '@smui/tab-bar/src';
	import { onMount } from 'svelte';

	export let tabs: string[] = []
	export let active: string;

	let isMounted = false;
	
	onMount(() => {
		isMounted = true;
	});
</script>

{#if isMounted}
	<TabBar tabs={tabs} let:tab bind:active>
		<Tab {tab}>
			<Label>{tab}</Label>
		</Tab>
	</TabBar>
{/if}
