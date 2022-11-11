<script lang="ts">
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
</script>

<DataTable table$aria-label="People list" style="width: 100%; max-width: 480px">
	<Head>
		<Row>
			<Cell>Residency</Cell>
			<Cell numeric>Local</Cell>
			<Cell numeric>Foreigner</Cell>
			<Cell numeric><strong>Total</strong></Cell>
		</Row>
	</Head>
	<Body>
		{#each ['Bhikkhu', 'Samanera', 'Sayalay', 'Layman', 'Laywoman'] as resident}
    <Row>
      <Cell>{resident}</Cell>
			<Cell numeric>-</Cell>
			<Cell numeric>-</Cell>
			<Cell numeric>-</Cell>
    </Row>
    {/each}
    <Row>
      <Cell><strong>Total</strong></Cell>
			<Cell numeric>-</Cell>
			<Cell numeric>-</Cell>
			<Cell numeric>-</Cell>
    </Row>
	</Body>
</DataTable>
