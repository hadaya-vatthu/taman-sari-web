<script lang="ts">
	import List, { Item, Meta, Label } from '@smui/list';
	import Checkbox from '@smui/checkbox';

	import type { PersonRecord } from 'src/models/person.model';
	import { createEventDispatcher } from 'svelte';

	export let personList: PersonRecord[];
	export let selected: number[];
	export let dirties: number[];

	const dispatch = createEventDispatcher();

	const handleListSelectionChange = (event: CustomEvent<any>) => {
		const changedIndices: number[] = event?.detail.changedIndices;
		const personIdList = changedIndices.map((i) => {
			const person_id = personList[i].id;
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
		{#each personList as person (person.id)}
			<Item disabled={dirties.includes(person.id)}>
				<Label>{person.birth_name}</Label>
				<Meta>
					<Checkbox
						bind:group={selected}
						value={person.id}
						indeterminate={dirties.includes(person.id)}
						disabled
					/>
				</Meta>
			</Item>
		{/each}
	</List>
</div>
