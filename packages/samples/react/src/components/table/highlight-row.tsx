import type { KoliBriTableDataType, KoliBriTableHeaders } from '@public-ui/components';
import { KolInputNumber, KolTableStateful } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

const ROWS_COUNT = 10;

type DataRow = {
	id: number;
	name: string;
	email: string;
	status: string;
};

const FIRST_NAMES = [
	'Max',
	'Erika',
	'John',
	'Jane',
	'Peter',
	'Anna',
	'Michael',
	'Sarah',
	'Thomas',
	'Lisa',
	'Daniel',
	'Maria',
	'Christian',
	'Laura',
	'Stefan',
	'Julia',
	'Andreas',
	'Sophie',
	'Markus',
	'Emma',
];
const LAST_NAMES = [
	'Mustermann',
	'Musterfrau',
	'Doe',
	'Smith',
	'Schmidt',
	'Müller',
	'Weber',
	'Meyer',
	'Wagner',
	'Becker',
	'Fischer',
	'Schneider',
	'Hoffmann',
	'Koch',
	'Bauer',
	'Richter',
	'Klein',
	'Wolf',
	'Schröder',
	'Neumann',
];
const STATUSES = ['active', 'inactive', 'pending'];

const generateData = (count: number): DataRow[] => {
	return Array.from({ length: count }, (_, i) => {
		const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
		const lastName = LAST_NAMES[Math.floor(i / FIRST_NAMES.length) % LAST_NAMES.length];
		const status = STATUSES[i % STATUSES.length];
		const id = i + 1;

		return {
			id,
			name: `${firstName} ${lastName}`,
			email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${id > 20 ? id : ''}@example.com`,
			status,
		};
	});
};

const DATA: DataRow[] = generateData(ROWS_COUNT);

export const TableHighlightRow: FC = () => {
	const [highlightIndex, setHighlightIndex] = React.useState(2); // Index of the row to highlight (0-based)
	const headers = React.useMemo<KoliBriTableHeaders>(() => {
		const createRenderFn = (dataKey: keyof DataRow) => (el: HTMLElement, data: KoliBriTableDataType) => {
			const rowData = data.data as DataRow;
			if (rowData.id === highlightIndex + 1) {
				el.innerHTML = `<strong>${String(rowData[dataKey])}</strong>`;
			} else {
				el.textContent = String(rowData[dataKey]);
			}
		};

		const createCompareFn = (key: keyof DataRow) => (data0: unknown, data1: unknown) => {
			const val0 = (data0 as DataRow)[key];
			const val1 = (data1 as DataRow)[key];
			if (typeof val0 === 'number' && typeof val1 === 'number') {
				return val0 - val1;
			}
			if (typeof val0 === 'string' && typeof val1 === 'string') {
				return val0.localeCompare(val1, 'de');
			}
			return 0;
		};

		return {
			horizontal: [
				[
					{
						key: 'id',
						label: 'ID',
						textAlign: 'left',
						width: 60,
						compareFn: createCompareFn('id'),
						render: createRenderFn('id'),
						sortDirection: 'ASC',
					},
					{
						key: 'name',
						label: 'Name',
						textAlign: 'left',
						compareFn: createCompareFn('name'),
						render: createRenderFn('name'),
						sortDirection: 'ASC',
					},
					{
						key: 'email',
						label: 'E-Mail',
						textAlign: 'left',
						compareFn: createCompareFn('email'),
						render: createRenderFn('email'),
						sortDirection: 'ASC',
					},
					{
						key: 'status',
						label: 'Status',
						textAlign: 'center',
						width: 100,
						compareFn: createCompareFn('status'),
						render: createRenderFn('status'),
						sortDirection: 'ASC',
					},
				],
			],
		} satisfies KoliBriTableHeaders;
	}, [highlightIndex]);

	return (
		<>
			<SampleDescription>
				<p>
					This sample demonstrates how to programmatically highlight a specific row in a table. You can change the highlighted row by using the input field
					above the table.
				</p>
				<p>
					The highlighting is achieved by using a custom <code>render</code> function for each column, which checks if the current row's ID matches the selected
					highlight index and applies bold styling.
				</p>
			</SampleDescription>

			<section className="flex flex-col gap-4">
				<KolInputNumber
					className="self-start"
					_label="Highlight Row Index"
					_value={highlightIndex}
					_on={{
						onInput: (_, value) => setHighlightIndex(Number(value)),
					}}
					_min={0}
					_max={ROWS_COUNT - 1}
				/>
				<KolTableStateful _label="Benutzerverwaltung mit Hervorhebung" _headers={headers} _data={DATA} className="block" />
			</section>
		</>
	);
};
