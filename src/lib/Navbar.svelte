<script lang="ts">
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';
	import CircularProgress from '@smui/circular-progress';
	import Button from '@smui/button';
	import Tooltip, { Wrapper } from '@smui/tooltip';

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
			<!-- <IconButton class="material-icons">menu</IconButton> -->
			<IconButton class="material-icons" aria-label="Go to Home" href="/">home</IconButton>
			<Title>{$navbarTitle}</Title>
		</Section>
		<Section align="end" toolbar>
			{#if !$sessionSt}
				<Wrapper>
					<IconButton class="material-icons" aria-label="Admin Login" href="/login">admin_panel_settings</IconButton>
					<Tooltip xPos="start">Admin Login</Tooltip>
				</Wrapper>
			{:else if loading}
				<CircularProgress style="height: 32px; width: 32px;" indeterminate fourColor />
			{:else}
			<Wrapper>
					<IconButton class="material-icons" aria-label="Logout" on:click={signOut}>logout</IconButton>
					<Tooltip xPos="start">Logout</Tooltip>
				</Wrapper>
			{/if}
		</Section>
	</Row>
</TopAppBar>
