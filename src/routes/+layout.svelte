<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';

	import { supabaseClient } from '$lib/supabaseClient';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './+layout';

	export let data: LayoutData;

	$: locale = ((locale: string) => {
		switch (locale) {
			case 'id':
				return 'id_ID';
			case 'en':
			default:
				return 'en_US';
		}
	})(data.initLocale);

	let url: string;
	$: console.debug(url);

	onMount(() => {
		url = window.location.href;

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

<svelte:head>
	<meta property="og:url" content={url} />
	<meta property="og:locale" content={locale} />
</svelte:head>

<div class="container">
	<Navbar />
	<slot />
</div>

<style>
	.container {
		max-width: 600px;
		margin: 0 auto;
	}
</style>
