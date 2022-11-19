<script lang="ts">
	import { addDays } from '$lib/helpers';
	import IconButton from '@smui/icon-button';
	import TopAppBar, { Row, Section } from '@smui/top-app-bar';
	import Tooltip, { Wrapper } from '@smui/tooltip';

	export let date = new Date();
	export let disabled = false;

	const today = new Date();
	$: title = date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
	$: isToday = date.toLocaleDateString() === today.toLocaleDateString();

	const handlePrev = () => {
		date = addDays(date, -1);
	};

	const handleNext = () => {
		date = addDays(date, 1);
	};

	const handleToday = () => {
		date = new Date();
	};
</script>

<TopAppBar variant="static" color="primary" dense>
	<Row>
		<Section>
			<IconButton size="mini" class="material-icons" {disabled} on:click={handlePrev}
				>keyboard_arrow_left</IconButton
			>
			<div class="mdc-typography--subtitle1 title">{title}</div>
		</Section>
		<Section align="end" toolbar>
			{#if !isToday}
				<Wrapper>
					<IconButton size="mini" class="material-icons" {disabled} on:click={handleToday}
						>today</IconButton
					>
					<Tooltip xPos="start">Go to today</Tooltip>
				</Wrapper>
			{/if}
			<IconButton size="mini" class="material-icons" {disabled} on:click={handleNext}
				>keyboard_arrow_right</IconButton
			>
		</Section>
	</Row>
</TopAppBar>

<style>
	.title {
		font-family: Roboto, sans-serif;
		font-weight: 500;
		letter-spacing: 0.0125em;
		font-size: 1rem;
	}
</style>
