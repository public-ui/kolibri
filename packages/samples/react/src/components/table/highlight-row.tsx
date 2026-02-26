import type { KoliBriTableDataType, KoliBriTableHeaderCellWithLogic } from '@public-ui/components';
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
	const HEADERS = React.useMemo(() => {
		const HEADERS: { horizontal: KoliBriTableHeaderCellWithLogic[][] } = {
			horizontal: [
				[
					{
						key: 'id',
						label: 'ID',
						textAlign: 'left',
						width: 60,
						compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) => (data0 as unknown as DataRow).id - (data1 as unknown as DataRow).id,
						render: (el: HTMLElement, data: KoliBriTableDataType) => {
							const rowData = data.data as unknown as DataRow;
							if (rowData.id === highlightIndex + 1) {
								el.innerHTML = `<b>${rowData.id}</b>`;
							}else {
								el.textContent = String(rowData.id);
							}
						},
						sortDirection: 'ASC',
					},
					{
						key: 'name',
						label: 'Name',
						textAlign: 'left',
						compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) =>
							(data0 as unknown as DataRow).name.localeCompare((data1 as unknown as DataRow).name, 'de'),
						render: (el: HTMLElement, data: KoliBriTableDataType) => {
							const rowData = data.data as unknown as DataRow;
							if (rowData.id === highlightIndex + 1) {
								el.innerHTML = `<b>${rowData.name}</b>`;
							}else {
								el.textContent = rowData.name;
							}
						},
						sortDirection: 'ASC',
					},
					{
						key: 'email',
						label: 'E-Mail',
						textAlign: 'left',
						compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) =>
							(data0 as unknown as DataRow).email.localeCompare((data1 as unknown as DataRow).email, 'de'),
						render: (el: HTMLElement, data: KoliBriTableDataType) => {
							const rowData = data.data as unknown as DataRow;
							if (rowData.id === highlightIndex + 1) {
								el.innerHTML = `<b>${rowData.email}</b>`;
							}else {
								el.textContent = rowData.email;
							}
						},
						sortDirection: 'ASC',
					},
					{
						key: 'status',
						label: 'Status',
						textAlign: 'center',
						width: 100,
						compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) =>
							(data0 as unknown as DataRow).status.localeCompare((data1 as unknown as DataRow).status, 'de'),
						render: (el: HTMLElement, data: KoliBriTableDataType) => {
							const rowData = data.data as unknown as DataRow;
							if (rowData.id === highlightIndex + 1) {
								el.innerHTML = `<b>${rowData.status}</b>`;
							}else {
								el.textContent = rowData.status;
							}
						},
						sortDirection: 'ASC',
					}
				],
			],
		};
		return HEADERS;
	}, [highlightIndex]);
	return (
		<>
			<SampleDescription>
				<p>
					Performance demo: {ROWS_COUNT} rows with action buttons defined once in the column header using the refactored approach. The factory function generates
					actions for each row on demand, eliminating redundant data and improving maintainability.
				</p>
				<p>
					Actions stay type-safe with <code>ActionColumnPropType</code> (ButtonProps or LinkProps), and no custom render functions are needed.
				</p>
			</SampleDescription>

			<section className="w-full">
				<KolInputNumber
					_label="Highlight Row Index"
					_value={highlightIndex}
					_on={{
						onInput: (_, value) => setHighlightIndex(value as number)
					}}
					_min={0}
					_max={ROWS_COUNT - 1}
				/>
				<KolTableStateful _label="Benutzerverwaltung mit Hervorhebung" _headers={HEADERS} _data={DATA} className="block" />
			</section>
		</>
	);
};

