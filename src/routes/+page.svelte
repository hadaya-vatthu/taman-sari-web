<script lang="ts">
	import { prefetch } from '$app/navigation';
	import { navbarTitle } from '$lib/stores';
	import { sessionSt } from '$lib/stores';
	import Button from '@smui/button';
	import Hero from './_Hero.svelte';

	navbarTitle.set('PATVDH - Taman Sari');
</script>

<Hero />

<div class="container">
	<Button variant="outlined" href="/daily-info" on:mouseover={() => prefetch('/daily-info')}
		>Daily Information</Button
	>
	{#if $sessionSt}
		<Button variant="outlined" href="/attendance" on:mouseover={() => prefetch('/attendance')}
			>Attendance Management</Button
		>
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
</style>
