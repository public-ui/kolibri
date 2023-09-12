import React, { FC } from 'react';

import { KolTable } from '@public-ui/react';
import { KoliBriTableHeaders } from '@public-ui/components';
import { DATA, Data } from './test-data';

const DATE_FORMATTER = Intl.DateTimeFormat('de-DE', {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
});

const HEADERS: KoliBriTableHeaders = {
	horizontal: [
		[
			{ label: 'order', key: 'order', textAlign: 'center' },
			{
				label: 'date',
				key: 'date',
				textAlign: 'center',
				render: (_el, _cell, tupel) => DATE_FORMATTER.format((tupel as Data).date),
				sort: (data: Data[]) =>
					data.sort((data0, data1) => {
						if (data0.date < data1.date) return -1;
						else if (data1.date < data0.date) return 1;
						else return 0;
					}),
			},
		],
	],
};

new Array(15).fill(null).forEach((_v, idx) => {
	const rand = Math.round(Math.random() * 999999999999);
	DATA.push({
		order: idx,
		date: new Date(rand),
	});
});

export const TableSortTabel: FC = () => <KolTable _caption="Sort a date column" _data={DATA} _headers={HEADERS} />;
