<script lang="ts">
	import { t } from '$lib/translations';
</script>

<div id="hero">
	<div class="mdc-typography--headline6">{$t('home.greeting')}</div>

	<div class="center">
		<div class="mdc-typography--headline2"><strong>PATVDH - TS</strong></div>
		<div class="mdc-typography--body1">Pa Auk Tawya Vipassana Dhura Hermitage</div>
		<div class="mdc-typography--body1">Taman Sari</div>
	</div>
</div>

<style type="text/scss">
	@use '_Hero.scss';

	#hero {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 50vh;
	}
	.center {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
