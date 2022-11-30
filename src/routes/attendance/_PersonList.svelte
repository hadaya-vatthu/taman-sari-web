<script lang="ts">
	import List, { Item, Meta, Label } from '@smui/list';
	import Checkbox from '@smui/checkbox';

	import type { NameRecord } from 'src/models/person.model';
	import { createEventDispatcher } from 'svelte';

	export let nameRecords: Pick<NameRecord, "id"|"name">[];
	export let selected: number[];
	export let dirties: number[];

	const dispatch = createEventDispatcher();

	const handleListSelectionChange = (event: CustomEvent<any>) => {
		const changedIndices: number[] = event?.detail.changedIndices;
		const personIdList = changedIndices.map((i) => {
			const person_id = nameRecords[i].id;
			return { person_id, checked: selected.includes(person_id) };
		});
		dispatch('selectionChange', personIdList);
	};
</script>

<div>
	<List
		class="demo-list"
		checkList
		on:SMUIList:action
		on:SMUIList:selectionChange={(e) => handleListSelectionChange(e)}
	>
		{#each nameRecords as record (record.id)}
			<Item disabled={dirties.includes(record.id)}>
				<Label>{record.name}</Label>
				<Meta>
					<Checkbox
						bind:group={selected}
						value={record.id}
						indeterminate={dirties.includes(record.id)}
						disabled
					/>
				</Meta>
			</Item>
		{/each}
	</List>
</div>
