<script lang="ts">
	import List, { Item, Meta, Label } from '@smui/list';
	import Checkbox from '@smui/checkbox';

	import type { NameRecord } from 'src/models/person.model';
	import { createEventDispatcher } from 'svelte';
	import Dots from './_Dots.svelte';
	import type { PersonListItems } from './types';

	export let items: PersonListItems;
	export let selected: number[];
	export let dirties: number[];

	const dispatch = createEventDispatcher();

	const handleListSelectionChange = (event: CustomEvent<any>) => {
		const changedIndices: number[] = event?.detail.changedIndices;
		const checkTable = changedIndices.map((i) => {
			const person_id = items[i].id;
			return { person_id, checked: selected.includes(person_id) };
		});
		dispatch('selectionChange', checkTable);
	};
</script>

<div>
	<List
		class="demo-list"
		checkList
		on:SMUIList:action
		on:SMUIList:selectionChange={(e) => handleListSelectionChange(e)}
	>
		{#each items as item (item.id)}
			<Item disabled={dirties.includes(item.id)}>
				<Label><div>
					{item.name}<Dots dots={item.dots} />
				</div></Label>
				<Meta>
					<Checkbox
						bind:group={selected}
						value={item.id}
						indeterminate={dirties.includes(item.id)}
						disabled
					/>
				</Meta>
			</Item>
		{/each}
	</List>
</div>
