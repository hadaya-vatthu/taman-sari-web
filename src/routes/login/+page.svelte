<script lang="ts">
	import { navbarTitle } from '$lib/stores';
	import { supabaseClient } from '$lib/supabaseClient';
	import Button from '@smui/button';
	import TextField from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';

	let email = '';
	let loading = false;

	const handleSubmit = async () => {
		try {
			loading = true;
			const { error } = await supabaseClient.auth.signInWithOtp({ email });
			if (error) throw error;
			alert('Check your email for the login link!');
		} catch (error) {
			console.error(error);
			if (error instanceof Error) alert(error.message);
		} finally {
			loading = false;
		}
	};

	navbarTitle.set('Admin Login');
</script>

<svelte:head>
	<title>Login - Taman Sari</title>
</svelte:head>

<form id="login-form" on:submit|preventDefault={handleSubmit}>
	<div class="wrapper">
		<TextField
			type="email"
			label="Email"
			name="email"
			disabled={loading}
			required
			style="min-width: 250px;"
			bind:value={email}
		>
			<HelperText validationMsg slot="helper">Enter a valid email address</HelperText>
		</TextField>

		<Button type="submit" variant="raised" disabled={loading}
			>{loading ? 'Loading' : 'Send Magic Link'}</Button
		>
	</div>
</form>

<style>
	#login-form {
		margin-top: 2em;
	}
	.wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
