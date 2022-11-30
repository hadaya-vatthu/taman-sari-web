<script lang="ts">
	import Radio from '@smui/radio';
	import FormField from '@smui/form-field';

	export let label: string;
	export let value: unknown;
	export let input$name: string;
	export let selected = false;
	export let group: any = undefined;
</script>

<div class="radio-item">
	<FormField>
		<Radio bind:value bind:group {input$name} {selected}/>
		<span slot="label">
			{label}
		</span>
	</FormField>
</div>

<style>
	.radio-item {
		margin: 0 24px;
	}
</style>
