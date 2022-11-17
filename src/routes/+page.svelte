<script lang="ts">
	import { navbarTitle } from '$lib/stores';
	import { sessionSt } from '$lib/stores'
	import Button from '@smui/button';

	navbarTitle.set('Taman Sari');
</script>

<div id="hero">
	<h1>Welcome to Taman Sari</h1>
</div>

<div class="container">
	<Button href="/daily-information">Daily Information</Button>
	{#if $sessionSt} 
	<Button href="/attendance">Attendance Management</Button>
	{/if}
</div>

<style>
	#hero {
		padding: 16px;
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 16px;
	}
</style>
