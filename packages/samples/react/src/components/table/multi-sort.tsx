import type { FC } from 'react';
import React, { useState } from 'react';

import type { KoliBriTableDataType, KoliBriTableHeaders } from '@public-ui/components';
import { KolHeading, KolInputCheckbox, KolTableStateful } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';
import type { Data } from './test-data';
import { DATA } from './test-data';

const DATE_FORMATTER = Intl.DateTimeFormat('de-DE', {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
});

type BacklogEntry = Data & {
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

const BACKLOG_DATA: BacklogEntry[] = DATA.slice(0, 15).map((entry, index) => ({
	...entry,
	assignee: ASSIGNEES[index % ASSIGNEES.length],
	department: DEPARTMENTS[index % DEPARTMENTS.length],
	priority: PRIORITY_SEQUENCE[index % PRIORITY_SEQUENCE.length],
	status: STATUS_SEQUENCE[index % STATUS_SEQUENCE.length],
	openTickets: (index * 3) % 11,
}));

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

const HEADERS_BACKLOG: KoliBriTableHeaders = {
	horizontal: [
		[
			{
				label: 'Assignee',
				key: 'assignee',
				compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) =>
					(data0 as BacklogEntry).assignee.localeCompare((data1 as BacklogEntry).assignee, 'de'),
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
		],
	],
};
export const MultiSortTable: FC = () => {
	const [allowMultiSortVertical, setAllowMultiSortVertical] = useState(false);
	const [allowMultiSortHorizontal, setAllowMultiSortHorizontal] = useState(true);
	const [allowBacklogMultiSort, setAllowBacklogMultiSort] = useState(true);
	return (
		<>
			<SampleDescription>
				<p>
					Multi-sort allows layering multiple column sorts at once. Compare the compact examples with the project backlog showcase to see how the sort order
					indicator helps track complex prioritisation.
				</p>
			</SampleDescription>

			<section className="w-full grid gap-6">
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Vertical" />
					<KolInputCheckbox
						_checked={allowMultiSortVertical}
						_label="Allow Multi-Sort"
						_variant="switch"
						_on={{ onChange: (_, value) => setAllowMultiSortVertical(Boolean(value)) }}
					></KolInputCheckbox>
					<KolTableStateful
						_label="Sort Table with Order and Date"
						_minWidth="auto"
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
					<KolTableStateful
						_label="Sort Table with Order and Date"
						_minWidth="auto"
						_data={DATA}
						_headers={HEADERS_HORIZONTAL}
						className="block"
						_allowMultiSort={allowMultiSortHorizontal}
					/>
				</section>
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Project backlog" />
					<p className="m-0 text-sm">
						Use multi-sort to group by priority, status and department. Hold the Shift key while clicking headers to add a second or third sort level and reveal
						the order indicators.
					</p>
					<KolInputCheckbox
						_checked={allowBacklogMultiSort}
						_label="Allow Multi-Sort"
						_variant="switch"
						_on={{ onChange: (_, value) => setAllowBacklogMultiSort(Boolean(value)) }}
					></KolInputCheckbox>
					<KolTableStateful
						_label="Project backlog"
						_minWidth="60rem"
						_data={BACKLOG_DATA}
						_headers={HEADERS_BACKLOG}
						className="block"
						_allowMultiSort={allowBacklogMultiSort}
					/>
				</section>
			</section>
		</>
	);
};
