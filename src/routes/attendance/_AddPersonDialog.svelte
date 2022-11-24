<script lang="ts">
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import AddPersonForm from './_AddPersonForm.svelte';
	import type { FormValues } from './$types';

	export let open = false;

	let formValues: FormValues = {
		birth_name: '',
		sex: 'm',
		citizenship: {id:110, name:'Indonesia'},
		birth_year: null,
		domicile: null
	};

	const handleSubmit = async (e: unknown) => {
		console.debug(formValues);
	};
</script>

<form method="post" on:submit|preventDefault={handleSubmit}>
	<Dialog bind:open aria-labelledby="add-dialog" aria-describedby="add-dialog-content">
		<!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
		<Title id="add-dialog">Add Person</Title>
		<Content id="add-dialog-content">
			<AddPersonForm bind:fields={formValues} />
		</Content>
		<Actions style="flex-direction: row-reverse; justify-content: flex-start">
			<Button defaultAction type="submit">
				<Label>Add</Label>
			</Button>
			<Button type="button">
				<Label>Cancel</Label>
			</Button>
		</Actions>
	</Dialog>
</form>
