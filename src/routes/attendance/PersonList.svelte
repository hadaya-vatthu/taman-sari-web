<script lang="ts">
	import List, { Item, Meta, Label } from '@smui/list';
	import Checkbox from '@smui/checkbox';

	type People = {
		id: number;
		birth_name: string;
	};

	let selected: number[] = [];
	let changeEvent: CustomEvent<{ changedIndices: number[] }> | null;

	let people: People[] = [
		{
			id: 0,
			birth_name: 'Kuṇdadhana'
		},
		{
			id: 1,
			birth_name: 'Ñāṇobhasa'
		},
		{
			id: 2,
			birth_name: 'Sudassana'
		},
		{
			id: 3,
			birth_name: 'Aloka'
		},
		{
			id: 4,
			birth_name: 'Nagasena'
		},
		{
			id: 5,
			birth_name: 'Jordi Yaputra'
		}
	];
</script>

<div>
	<List class="demo-list" checkList on:SMUIList:selectionChange={(event) => (changeEvent = event)}>
		{#each people as person}
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
