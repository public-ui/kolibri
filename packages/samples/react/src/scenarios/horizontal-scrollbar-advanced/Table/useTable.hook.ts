import DatabaseData from './databasedata.json';
import { columnDefinitions } from './columns';
import React from 'react';

type UseTableResult = {
	data: any;
	columns: any;
	tableWith: string;
};

function useTable(): UseTableResult {
	const [tableWith] = React.useState(() => {
		let width = 0;

		for (const def of columnDefinitions as { width: string }[]) {
			width += Number(def.width?.replace('px', '') || 0);
		}
		return `${width}px`;
	});

	return {
		data: DatabaseData,
		columns: columnDefinitions,
		tableWith,
	};
}

export { useTable };
