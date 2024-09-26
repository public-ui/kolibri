import type { FC } from 'react';
import React, { useState } from 'react';

import { KolHeading, KolInputCheckbox, KolTable } from '@public-ui/react';
import type { KoliBriTableHeaders, KoliBriTableDataType } from '@public-ui/components';
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
			{
				label: 'order',
				key: 'order',
				textAlign: 'center',
				compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) => {
					if ((data0 as Data).order < (data1 as Data).order) return -1;
					else if ((data1 as Data).order < (data0 as Data).order) return 1;
					else return 0;
				},
			},
			{
				label: 'date',
				key: 'date',
				textAlign: 'center',
				render: (_el, _cell, tupel) => DATE_FORMATTER.format((tupel as Data).date),
				compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) => {
					if ((data0 as Data).date < (data1 as Data).date) return -1;
					else if ((data1 as Data).date < (data0 as Data).date) return 1;
					else return 0;
				},
			},
		],
	],
};

const HEADERS_VERTICAL: KoliBriTableHeaders = {
	vertical: [
		[
			{
				label: 'order',
				key: 'order',
				textAlign: 'center',
				compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) => {
					if ((data0 as Data).order < (data1 as Data).order) return -1;
					else if ((data1 as Data).order < (data0 as Data).order) return 1;
					else return 0;
				},
			},
			{
				label: 'date',
				key: 'date',
				textAlign: 'center',
				render: (_el, _cell, tupel) => DATE_FORMATTER.format((tupel as Data).date),
				compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) => {
					if ((data0 as Data).date < (data1 as Data).date) return -1;
					else if ((data1 as Data).date < (data0 as Data).date) return 1;
					else return 0;
				},
			},
		],
	],
};
export const MultiSortTable: FC = () => {
	const [allowMultiSortVertical, setAllowMultiSortVertical] = useState(false);
	const [allowMultiSortHorizontal, setAllowMultiSortHorizontal] = useState(true);
	return (
		<>
			<SampleDescription>
				<p>This sample shows KolTable with multi-sort functionality, allowing sorting by both &quot;order&quot; and &quot;date&quot; columns.</p>
			</SampleDescription>

			<section className="w-full grid gap-4">
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Vertical" />
					<KolInputCheckbox
						_checked={allowMultiSortVertical}
						_label="Allow Multi-Sort"
						_variant="switch"
						_on={{ onChange: (_, value) => setAllowMultiSortVertical(Boolean(value)) }}
					></KolInputCheckbox>
					<KolTable
						_label="Sort Table with Order and Date"
						_data={DATA.slice(0, 10)}
						_headers={HEADERS_VERTICAL}
						className="block"
						_allowMultiSort={allowMultiSortVertical}
					/>
				</section>
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Horizontal" />
					<KolInputCheckbox
						_checked={allowMultiSortHorizontal}
						_label="Allow Multi-Sort"
						_variant="switch"
						_on={{ onChange: (_, value) => setAllowMultiSortHorizontal(Boolean(value)) }}
					></KolInputCheckbox>
					<KolTable
						_label="Sort Table with Order and Date"
						_data={DATA}
						_headers={HEADERS_HORIZONTAL}
						className="block"
						_allowMultiSort={allowMultiSortHorizontal}
					/>
				</section>
			</section>
		</>
	);
};
