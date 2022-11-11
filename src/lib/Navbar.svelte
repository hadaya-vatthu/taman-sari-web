<script lang="ts">
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar/src';
	import IconButton from '@smui/icon-button/src';

	import {navbarTitle} from '$lib/stores'
</script>

<TopAppBar variant="static" color="primary">
	<Row>
		<Section>
			<IconButton class="material-icons">menu</IconButton>
			<Title>{$navbarTitle}</Title>
		</Section>
		<Section align="end" toolbar>
			<IconButton class="material-icons" aria-label="Go to Home" href="/">home</IconButton>
		</Section>
	</Row>
</TopAppBar>
