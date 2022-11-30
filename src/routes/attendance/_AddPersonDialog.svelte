<script lang="ts">
	import { invalidateAll } from '$app/navigation';

	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import CircularProgress from '@smui/circular-progress';

	import { supabaseClient } from '$lib/supabaseClient';
	import AddPersonForm from './_AddPersonForm.svelte';
	import type { FormValues } from './types';

	export let open = false;

	let isSubmitting = false;

	const initialFormValues = {
		birth_name: '',
		sex: 'm',
		citizenship: { id: 110, name: 'Indonesia' },
		birth_year: null,
		domicile: null
	};
	let formValues: FormValues = { ...initialFormValues };

	const handleSubmit = async () => {
		try {
			isSubmitting = true;
			const { error } = await supabaseClient.from('people').insert({
				...formValues,
				citizenship: formValues.citizenship.id
			});
			// .select<'*', PersonRecord>();
			if (error) throw error;

			await invalidateAll(); // refresh the page

			open = false;
			formValues = { ...initialFormValues };
		} catch (error) {
			throw error;
		} finally {
			isSubmitting = false;
		}
	};
</script>

<form method="post" on:submit|preventDefault={handleSubmit}>
	<Dialog
		{open}
		aria-labelledby="add-dialog"
		aria-describedby="add-dialog-content"
		scrimClickAction=""
	>
		<!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
		<Title id="add-dialog">Add Person</Title>
		<Content id="add-dialog-content">
			<AddPersonForm bind:fields={formValues} />
		</Content>
		<Actions style="flex-direction: row-reverse; justify-content: flex-start">
			<Button type="submit" disabled={isSubmitting} action="">
				<Label>
					{#if isSubmitting}
						<CircularProgress indeterminate style="height: 30px; width: 30px;" />
					{:else}
						Add
					{/if}
				</Label>
			</Button>
			<Button type="button" disabled={isSubmitting}>
				<Label>Cancel</Label>
			</Button>
		</Actions>
	</Dialog>
</form>
