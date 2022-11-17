<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';

	import { supabaseClient } from '$lib/supabaseClient';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	
	export let data: LayoutData;

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<div class="container">
	<Navbar session={data.session} />
	<slot />
</div>

<style>
	.container {
		max-width: 600px;
		margin: 0 auto;
	}
</style>
