<script lang="ts">
	import Dot from './_Dot.svelte';

	export let dots: boolean[]

	const getOpacity = (length: number, i: number) => {
		return (i + 2) / (length + 1);
	};
</script>

<span class="dots">
	{#each dots as dot, i}
		<Dot visible={dot} opacity={getOpacity(dots.length, i)} />
	{/each}
</span>

<style>
	.dots {
		display: inline-block;
		margin-left: 1em;
	}
</style>
