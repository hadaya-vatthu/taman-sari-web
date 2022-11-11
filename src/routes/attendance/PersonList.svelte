<script lang="ts">
	import List, { Item, Meta, Label } from '@smui/list';
	import Checkbox from '@smui/checkbox';
	import { personSlice } from '$lib/stores';
	
	let selected: number[] = [];
	let changeEvent: CustomEvent<{ changedIndices: number[] }> | null;
</script>

<div>
	<List class="demo-list" checkList on:SMUIList:selectionChange={(event) => (changeEvent = event)}>
		{#each $personSlice.data as person}
			<Item>
				<Label>{person.birth_name}</Label>
				<Meta>
					<Checkbox bind:group={selected} value={person.id} />
				</Meta>
			</Item>
		{/each}
	</List>
</div>

<pre class="status">Selected: {selected.join(', ')}</pre>
<pre class="status">Change Event Detail: {changeEvent
		? JSON.stringify(changeEvent.detail)
		: 'No change yet.'}</pre>
