<script lang="ts">
	interface ImageMeta {
		src: string;
		width: number;
		height: number;
	}
	export let title: string | null = null;
	export let description: string | null = null;
	export let images: ImageMeta[] = [];
	$: titleText = title ? `${title} | PATVDH-TS` : 'PATVDH-TS';
</script>

<svelte:head>
	<title>{titleText}</title>

	<meta property="og:title" content={titleText} />
	{#if description}
		<meta property="og:description" content={description} />
	{/if}
	{#each images as image}
		<meta property="og:image" content={image.src} />
		<meta property="og:image:width" content={String(image.width)} />
		<meta property="og:image:height" content={String(image.height)} />
	{/each}
</svelte:head>
