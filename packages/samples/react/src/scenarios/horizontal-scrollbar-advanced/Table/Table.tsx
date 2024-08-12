import * as React from 'react';
import { KolTable } from '@public-ui/react';
import { useTable } from './useTable.hook';

function Table() {
	const table = useTable();

	return (
		<div style={{ overflow: 'hidden' }}>
			<KolTable
				_label="Table for demonstration purposes with horizontal scrollbar"
				_minWidth={table.tableWith}
				_headers={{ horizontal: [table.columns] }}
				_data={table.data}
				_pagination={{ _page: 1, _pageSize: 50 }}
				className="block"
			/>
		</div>
	);
}

export default Table;
