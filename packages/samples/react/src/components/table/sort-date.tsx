import React, { FC } from 'react';

import { KolTable } from '@public-ui/react';
import { KoliBriTableHeaders } from '@public-ui/components';
import { DATA, Data } from './test-data';
import { SampleDescription } from '../SampleDescription';

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

export const TableSortData: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolTable with sortable columns. The sort-order can be changed by clicking the &quot;date&quot; header column.</p>
		</SampleDescription>
		<KolTable _caption="Sort a date column" _data={DATA} _headers={HEADERS} className="block" />
	</>
);
