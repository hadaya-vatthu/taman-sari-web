<script lang="ts">
	export let visible = true;
	export let opacity: number = 1;
</script>

<span class={visible ? '' : 'hidden'} style:opacity={opacity} />

<style>
	.hidden {
		visibility: hidden;
	}
	span {
		display: inline-block;
		width: 6px;
		height: 6px;
		border-radius: 4px;
		margin: 2px;
		background-color: rgb(102, 51, 153);
	}
</style>
