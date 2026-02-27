import type { KoliBriTableHeaders } from '@public-ui/components';
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

const HEADERS: KoliBriTableHeaders = {
	horizontal: [
		[
			{
				key: 'id',
				label: 'ID',
				textAlign: 'left',
				width: 60,
				compareFn: createCompareFn('id'),
				sortDirection: 'ASC',
			},
			{
				key: 'name',
				label: 'Name',
				textAlign: 'left',
				compareFn: createCompareFn('name'),
				sortDirection: 'ASC',
			},
			{
				key: 'email',
				label: 'E-Mail',
				textAlign: 'left',
				compareFn: createCompareFn('email'),
				sortDirection: 'ASC',
			},
			{
				key: 'status',
				label: 'Status',
				textAlign: 'center',
				width: 100,
				compareFn: createCompareFn('status'),
				sortDirection: 'ASC',
			},
		],
	],
};

export const TableHighlightRow: FC = () => {
	const [highlightIndex, setHighlightIndex] = React.useState(2);

	return (
		<>
			<SampleDescription>
				<p>
					This sample demonstrates how to programmatically highlight a specific row in a table. You can change the highlighted row by using the input field
					above the table.
				</p>
				<p>
					The highlighting is achieved by using the <code>_highlightedRows</code> property, which accepts an array of row indices to highlight with bold
					styling.
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
				<KolTableStateful
					_label="Benutzerverwaltung mit Hervorhebung"
					_headers={HEADERS}
					_data={DATA}
					_highlightedRows={[highlightIndex]}
					className="block"
				/>
			</section>
		</>
	);
};
