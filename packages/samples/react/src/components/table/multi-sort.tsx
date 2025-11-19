import type { FC } from 'react';
import React, { useState } from 'react';

import type { KoliBriTableDataType, KoliBriTableHeaderCellWithLogic, KoliBriTableHeaders } from '@public-ui/components';
import { KolButtonLink, KolHeading, KolTableStateful } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';
import type { Data } from './test-data';
import { DATA } from './test-data';

const DATE_FORMATTER = Intl.DateTimeFormat('de-DE', {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
});

const TABLE_HEADER_CELLS: KoliBriTableHeaderCellWithLogic[] = [
	{
		label: 'order',
		key: 'order',
		textAlign: 'center',
		compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) => {
			if ((data0 as Data).order < (data1 as Data).order) return -1;
			else if ((data1 as Data).order < (data0 as Data).order) return 1;
			else return 0;
		},
		sortDirection: 'ASC',
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
];

const HEADERS_HORIZONTAL: KoliBriTableHeaders = {
	horizontal: [TABLE_HEADER_CELLS],
};

const HEADERS_VERTICAL: KoliBriTableHeaders = {
	vertical: [TABLE_HEADER_CELLS],
};

export const MultiSortTable: FC = () => {
	const [verticallHeader, setVerticalHeader] = useState(HEADERS_VERTICAL);
	const [horizontalHeader, setHorizontalHeader] = useState(HEADERS_HORIZONTAL);
	return (
		<>
			<SampleDescription>
				<p>This sample shows KolTableStateful with multi-sort functionality, allowing sorting by both &quot;order&quot; and &quot;date&quot; columns.</p>
			</SampleDescription>

			<section className="w-full grid gap-4">
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Vertical" />
					<KolButtonLink _label="Reset Table" _on={{ onClick: () => setVerticalHeader({ vertical: [[...TABLE_HEADER_CELLS]] }) }}></KolButtonLink>
					<KolTableStateful
						_label="Sort Table with Order and Date"
						_minWidth="auto"
						_data={DATA.slice(0, 10)}
						_headers={verticallHeader}
						className="block"
						_allowMultiSort={true}
					/>
				</section>
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Horizontal" />
					<KolButtonLink _label="Reset Table" _on={{ onClick: () => setHorizontalHeader({ horizontal: [[...TABLE_HEADER_CELLS]] }) }}></KolButtonLink>
					<KolTableStateful
						_label="Sort Table with Order and Date"
						_minWidth="auto"
						_data={DATA}
						_headers={horizontalHeader}
						className="block"
						_allowMultiSort={true}
					/>
				</section>
			</section>
		</>
	);
};
