<script lang="ts">
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar/src';
	import IconButton from '@smui/icon-button/src';
	import CircularProgress from '@smui/circular-progress';
	import Button from '@smui/button/src/Button.svelte';

	import { navbarTitle } from '$lib/stores';
	import { supabaseClient } from './supabaseClient';
	import { sessionSt } from '$lib/stores';

	let loading = false;

	async function signOut() {
		try {
			loading = true;
			let { error } = await supabaseClient.auth.signOut();
			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	}
</script>

<TopAppBar variant="static" color="primary">
	<Row>
		<Section>
			<IconButton class="material-icons">menu</IconButton>
			<IconButton class="material-icons" aria-label="Go to Home" href="/">home</IconButton>
			<Title>{$navbarTitle}</Title>
		</Section>
		<Section align="end" toolbar>
			{#if !$sessionSt}
				<Button href="/login">Login</Button>
			{:else if loading}
				<CircularProgress style="height: 32px; width: 32px;" indeterminate fourColor/>
			{:else}
				<Button on:click={signOut}>Logout</Button>
			{/if}
		</Section>
	</Row>
</TopAppBar>
