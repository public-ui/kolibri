import type { FC } from 'react';
import React from 'react';

import type { KoliBriTableDataType, KoliBriTableHeaders } from '@public-ui/components';
import { KolHeading, KolTableStateful } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';
import type { Data } from './test-data';
import { DATA } from './test-data';
import { ensureHeaderWidths } from './utils';

const DATE_FORMATTER = Intl.DateTimeFormat('de-DE', {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
});

const compareByDate =
	(sortDirection = 'ASC') =>
	(data0: KoliBriTableDataType, data1: KoliBriTableDataType) => {
		const first = (data0 as Data).date.getTime();
		const second = (data1 as Data).date.getTime();
		const result = first - second;
		return sortDirection === 'DESC' ? -result : result;
	};

const HEADERS_HORIZONTAL: KoliBriTableHeaders = ensureHeaderWidths({
	horizontal: [
		[
			{ label: 'order', key: 'order', textAlign: 'center' },
			{
				label: 'date',
				key: 'date',
				textAlign: 'center',
				render: (_el, _cell, tupel) => DATE_FORMATTER.format((tupel as Data).date),
				compareFn: (data0, data1, direction) => compareByDate(direction)(data0, data1),
			},
		],
	],
});

const HEADERS_VERTICAL: KoliBriTableHeaders = ensureHeaderWidths({
	vertical: [
		[
			{ label: 'order', key: 'order', textAlign: 'center' },
			{
				label: 'date',
				key: 'date',
				textAlign: 'center',
				render: (_el, _cell, tupel) => DATE_FORMATTER.format((tupel as Data).date),
				compareFn: (data0, data1, direction) => compareByDate(direction)(data0, data1),
			},
		],
	],
});

export const TableSortData: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolTableStateful with sortable columns. The sort-order can be changed by clicking the &quot;date&quot; header column.</p>
		</SampleDescription>

		<section className="w-full grid gap-4">
			<section className="grid gap-4">
				<KolHeading _level={2} _label="Vertical headers" />
				<KolTableStateful _label="Sort a date column" _data={DATA.slice(0, 10)} _headers={HEADERS_VERTICAL} className="block" />
			</section>
			<section className="grid gap-4">
				<KolHeading _level={2} _label="Horizontal headers" />
				<KolTableStateful _label="Sort a date column" _data={DATA} _headers={HEADERS_HORIZONTAL} className="block" />
			</section>
		</section>
	</>
);
