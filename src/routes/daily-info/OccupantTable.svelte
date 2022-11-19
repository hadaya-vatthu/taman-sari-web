<script lang="ts">
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import type { DailyOccupantViewRecord } from './$types';

	export let data: DailyOccupantViewRecord[];

	type Row = {
		local: number;
		foreigner: number;
		total: number;
	};

	const rowInitial = { local: 0, foreigner: 0, total: 0 };
	const rowReducer = (p: Row, r: DailyOccupantViewRecord) => {
		let { local, foreigner, total } = p;
		if (r.citizenship_name === 'Indonesia') {
			local += r.count;
		} else {
			foreigner += r.count;
		}
		total += r.count;
		return { local, foreigner, total };
	};
	$: tableData = {
		Bhikkhu: data.filter((r) => r.samana_type === 'Bhikkhu').reduce(rowReducer, rowInitial),
		Samanera: data.filter((r) => r.samana_type === 'Samanera').reduce(rowReducer, rowInitial),
		Sayalay: data.filter((r) => r.samana_type === 'Sayalay').reduce(rowReducer, rowInitial),
		Layman: data.filter((r) => !r.samana_type && r.sex === 'm').reduce(rowReducer, rowInitial),
		Laywoman: data.filter((r) => !r.samana_type && r.sex === 'f').reduce(rowReducer, rowInitial)
	};
	$: totalData = data.reduce(rowReducer, rowInitial);
</script>

<DataTable table$aria-label="People list" style="width: 100%; max-width: 480px">
	<Head>
		<Row>
			<Cell>Occupant</Cell>
			<Cell numeric>Local</Cell>
			<Cell numeric>Foreigner</Cell>
			<Cell numeric><strong>Total</strong></Cell>
		</Row>
	</Head>
	<Body>
		{#each Object.entries(tableData) as entry (entry[0])}
			<Row>
				<Cell>{entry[0]}</Cell>
				<Cell numeric>{entry[1].local}</Cell>
				<Cell numeric>{entry[1].foreigner}</Cell>
				<Cell numeric>{entry[1].total}</Cell>
			</Row>
		{/each}
		<Row>
			<Cell><strong>Total</strong></Cell>
			<Cell numeric>{totalData.local}</Cell>
			<Cell numeric>{totalData.foreigner}</Cell>
			<Cell numeric>{totalData.total}</Cell>
		</Row>
	</Body>
</DataTable>
