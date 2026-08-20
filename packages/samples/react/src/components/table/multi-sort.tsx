import type { FC } from 'react';
import React, { useState } from 'react';

import type { KoliBriTableDataType, KoliBriTableHeaderCellWithLogic, KoliBriTableHeaders } from '@public-ui/components';
import { KolButtonLink, KolTableStateful } from '@public-ui/react-v19';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

const DATE_FORMATTER = Intl.DateTimeFormat('de-DE', {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
});

type BacklogEntry = {
	date: Date;
	assignee: string;
	department: string;
	priority: 'High' | 'Medium' | 'Low';
	status: 'Blocked' | 'In progress' | 'Ready';
	openTickets: number;
};

const ASSIGNEES = ['Devon Chen', 'Fatima Alvi', 'Leon Köhler', 'Mila Schmidt', 'Sven Lindholm'];
const DEPARTMENTS = ['Customer Service', 'Digital Services', 'Infrastructure', 'Municipal Office'];
const PRIORITY_SEQUENCE: BacklogEntry['priority'][] = ['High', 'Medium', 'Low'];
const STATUS_SEQUENCE: BacklogEntry['status'][] = ['Blocked', 'In progress', 'Ready'];

const PRIORITY_ORDER = PRIORITY_SEQUENCE.reduce<Record<BacklogEntry['priority'], number>>(
	(order, priority, index) => {
		order[priority] = index;
		return order;
	},
	{} as Record<BacklogEntry['priority'], number>,
);

const STATUS_ORDER = STATUS_SEQUENCE.reduce<Record<BacklogEntry['status'], number>>(
	(order, status, index) => {
		order[status] = index;
		return order;
	},
	{} as Record<BacklogEntry['status'], number>,
);

const BACKLOG_DATA: BacklogEntry[] = Array.from({ length: 15 }).map((_, index) => ({
	date: new Date(Date.now() - index * 1000 * 60 * 60 * 24),
	assignee: ASSIGNEES[index % ASSIGNEES.length],
	department: DEPARTMENTS[index % DEPARTMENTS.length],
	priority: PRIORITY_SEQUENCE[index % PRIORITY_SEQUENCE.length],
	status: STATUS_SEQUENCE[index % STATUS_SEQUENCE.length],
	openTickets: (index * 3) % 11,
}));

const TABLE_HEADER_CELLS: KoliBriTableHeaderCellWithLogic[] = [
	{
		label: 'Assignee',
		key: 'assignee',

		compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) =>
			(data0 as BacklogEntry).assignee.localeCompare((data1 as BacklogEntry).assignee, 'de'),
		sortDirection: 'ASC',
	},
	{
		label: 'Department',
		key: 'department',

		compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) =>
			(data0 as BacklogEntry).department.localeCompare((data1 as BacklogEntry).department, 'de'),
	},
	{
		label: 'Priority',
		key: 'priority',

		textAlign: 'center',
		compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) =>
			PRIORITY_ORDER[(data0 as BacklogEntry).priority] - PRIORITY_ORDER[(data1 as BacklogEntry).priority],
		sortDirection: 'DESC',
	},
	{
		label: 'Status',
		key: 'status',

		textAlign: 'center',
		compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) =>
			STATUS_ORDER[(data0 as BacklogEntry).status] - STATUS_ORDER[(data1 as BacklogEntry).status],
	},
	{
		label: 'Open tickets',
		key: 'openTickets',

		textAlign: 'right',
		compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) => (data0 as BacklogEntry).openTickets - (data1 as BacklogEntry).openTickets,
	},
	{
		label: 'Last updated',
		key: 'date',

		textAlign: 'center',
		render: (_el, _cell, tuple) => DATE_FORMATTER.format((tuple as BacklogEntry).date),
		compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) => {
			if ((data0 as BacklogEntry).date < (data1 as BacklogEntry).date) return -1;
			else if ((data1 as BacklogEntry).date < (data0 as BacklogEntry).date) return 1;
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
				<p>
					Multi-sort allows layering multiple column sorts at once. Compare the compact examples with the project backlog showcase to see how the sort order
					indicator helps track complex prioritisation.
				</p>
			</SampleDescription>

			<section className="w-full grid gap-6">
				<SampleBlock id="vertical" heading="Vertical">
					<KolButtonLink _label="Reset Table" _on={{ onClick: () => setVerticalHeader({ vertical: [[...TABLE_HEADER_CELLS]] }) }}></KolButtonLink>
					<KolTableStateful
						_label="Sort Table with Order and Date"
						_data={BACKLOG_DATA.slice(0, 10)}
						_headers={verticallHeader}
						className="block"
						_allowMultiSort={true}
					/>
				</SampleBlock>
				<SampleBlock id="horizontal" heading="Horizontal">
					<KolButtonLink _label="Reset Table" _on={{ onClick: () => setHorizontalHeader({ horizontal: [[...TABLE_HEADER_CELLS]] }) }}></KolButtonLink>
					<KolTableStateful _label="Sort Table with Order and Date" _data={BACKLOG_DATA} _headers={horizontalHeader} className="block" _allowMultiSort={true} />
				</SampleBlock>
			</section>
		</>
	);
};
