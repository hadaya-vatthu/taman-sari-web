<script lang="ts">
	export let title: string | null = null;
</script>

<svelte:head>
	{#if title !== null}
		<title>{title} | PATVDH - TS</title>
	{:else}
		<title>PATVDH - TS</title>
	{/if}
</svelte:head>
