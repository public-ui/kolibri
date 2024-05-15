import type { FC } from 'react';
import React from 'react';

import { KolTable } from '@public-ui/react';
import type { KoliBriTableHeaders } from '@public-ui/components';
import type { Data } from './test-data';
import { DATA } from './test-data';
import { SampleDescription } from '../SampleDescription';

const DATE_FORMATTER = Intl.DateTimeFormat('de-DE', {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
});

const HEADERS_HORIZONTAL: KoliBriTableHeaders = {
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

const HEADERS_VERTICAL: KoliBriTableHeaders = {
	vertical: [
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

export const TableSortData: FC = () => {
	const [myData, setMyData] = React.useState<Data[]>(DATA.slice(0, 3));

	return (
		<>
			<SampleDescription>
				<p>
					Hier ist eine Tabelle, die durch anklicken des Knopfes sortiert werden kann. Entweder nach der Reihenfolge, nach dem ältesten Datum oder nach dem
					jüngsten Datum.
				</p>
			</SampleDescription>

			<h2>Vertical</h2>

			<KolTable _label="Sort a date column" _data={DATA.slice(0, 10)} _headers={HEADERS_VERTICAL} className="block" />

			<h2>Horizontal</h2>

			<KolTable _label="Sort a date column" _data={myData} _headers={HEADERS_HORIZONTAL} className="block" />
			<button
				onClick={() =>
					setMyData([
						...myData,
						{
							order: 1000,
							date: new Date(),
						},
					])
				}
			>
				add
			</button>

			<button onClick={() => setMyData(myData.filter((_el) => _el.order !== 1000))}>remove 1000</button>
		</>
	);
};
