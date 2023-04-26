import React from 'react';
import { KoliBriTableHeaders } from '@public-ui/components/dist/types/types/table';

import { KolTable } from '@public-ui/react';

import { FC } from 'react';

const DATE_FORMATTER = Intl.DateTimeFormat('de-DE', {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
});

type Data = {
	order: number;
	date: Date;
};
const DATA: Data[] = [];

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
