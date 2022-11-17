<script lang="ts">
	import { addDays } from '$lib/helpers';
	import IconButton from '@smui/icon-button';
	import TopAppBar, { Row, Section } from '@smui/top-app-bar';

	export let date = new Date();

	$: title = date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

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
			<IconButton size="mini" class="material-icons" on:click={handlePrev}
				>keyboard_arrow_left</IconButton
			>
			<div class="mdc-typography--subtitle1 title">{title}</div>
		</Section>
		<Section align="end" toolbar>
			<IconButton size="mini" class="material-icons" on:click={handleToday}>today</IconButton>
			<IconButton size="mini" class="material-icons" on:click={handleNext}
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
