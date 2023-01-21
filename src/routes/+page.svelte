<script lang="ts">
	import { prefetch } from '$app/navigation';
	import { navbarTitle } from '$lib/stores';
	import { sessionSt } from '$lib/stores';
	import Title from '$lib/Title.svelte';
	import { t } from '$lib/translations';
	import Button from '@smui/button';
	import Hero from './_Hero.svelte';

	navbarTitle.set('PATVDH - Taman Sari');
</script>

<Title title={$t('home.meta.title')}/>

<Hero />

<div class="container">
	<Button variant="outlined" href="/daily-info" on:mouseover={() => prefetch('/daily-info')}
		>{$t('home.daily-info-btn-label')}</Button
	>
	{#if $sessionSt}
		<Button variant="outlined" href="/attendance" on:mouseover={() => prefetch('/attendance')}
			>{$t('home.attendance-btn-label')}</Button
		>
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
</style>
