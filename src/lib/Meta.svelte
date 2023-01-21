<script lang="ts">
	export let title: string | null = null;
	export let description: string | null = null;
	export let image: string | null = null;
	$: titleText = title ? `${title} | PATVDH-TS` : 'PATVDH-TS';
</script>

<svelte:head>
	<title>{titleText}</title>

	<meta property="og:title" content={titleText} />
	{#if description}
		<meta property="og:description" content={description} />
	{/if}
	{#if image}
		<meta property="og:image" content={image} />
		<meta property="og:image:width" content="770" />
		<meta property="og:image:height" content="420" />
	{/if}
</svelte:head>
