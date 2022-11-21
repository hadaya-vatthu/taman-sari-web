<script lang="ts">
	import Fab, { Icon } from '@smui/fab';

	export let hide = false;
	export let autoHide = false;
	export let hideY = 100;

	let clicked: number = 0;
	let y: number;

	$: hide = autoHide && y > hideY;
</script>

<svelte:window bind:scrollY={y} />

{#if !hide}
	<div class="fabs" role="group" aria-label="Floating action buttons">
		<Fab color="primary" mini={hide} on:click={() => clicked++}>
			<Icon class="material-icons">add</Icon>
		</Fab>
	</div>
{/if}

<style>
	.fabs {
		--_viewport-margin: 3.5vmin;

		position: fixed;
		z-index: var(--layer-1);

		inset-block: auto var(--_viewport-margin);
		inset-inline: auto var(--_viewport-margin);
	}
</style>
