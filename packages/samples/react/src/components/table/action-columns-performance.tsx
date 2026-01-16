import type { ButtonProps, KoliBriTableDataType, KoliBriTableHeaderCellWithLogic } from '@public-ui/components';
import { KolTableStateful } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

const ROWS_COUNT = 50;

interface DataRow {
	id: number;
	name: string;
	email: string;
	status: string;
}

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

const createRowActions = (row: DataRow): ButtonProps[] => [
	{
		_label: 'Bearbeiten',
		_icons: 'kolicon-eye',
		_hideLabel: true,
		_tooltipAlign: 'top',
		_variant: 'secondary',
		_on: {
			onClick: () => {
				console.log('Edit clicked for:', row);
				alert(`Bearbeiten: ${row.name}`);
			},
		},
	},
	{
		_label: 'Löschen',
		_icons: 'kolicon-alert-error',
		_hideLabel: true,
		_tooltipAlign: 'top',
		_variant: 'danger',
		_on: {
			onClick: () => {
				console.log('Delete clicked for:', row);
				alert(`Löschen: ${row.name}`);
			},
		},
	},
	{
		_label: 'Details anzeigen',
		_icons: 'kolicon-alert-info',
		_hideLabel: true,
		_tooltipAlign: 'top',
		_variant: 'normal',
		_on: {
			onClick: () => {
				console.log('Details clicked for:', row);
				alert(`Details: ${JSON.stringify(row, null, 2)}`);
			},
		},
	},
];

const HEADERS: { horizontal: KoliBriTableHeaderCellWithLogic[][] } = {
	horizontal: [
		[
			{
				key: 'id',
				label: 'ID',
				textAlign: 'left',
				width: 60,
				compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) => (data0 as unknown as DataRow).id - (data1 as unknown as DataRow).id,
				sortDirection: 'ASC',
			},
			{
				key: 'name',
				label: 'Name',
				textAlign: 'left',
				compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) =>
					(data0 as unknown as DataRow).name.localeCompare((data1 as unknown as DataRow).name, 'de'),
				sortDirection: 'ASC',
			},
			{
				key: 'email',
				label: 'E-Mail',
				textAlign: 'left',
				compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) =>
					(data0 as unknown as DataRow).email.localeCompare((data1 as unknown as DataRow).email, 'de'),
				sortDirection: 'ASC',
			},
			{
				key: 'status',
				label: 'Status',
				textAlign: 'center',
				width: 100,
				compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) =>
					(data0 as unknown as DataRow).status.localeCompare((data1 as unknown as DataRow).status, 'de'),
				sortDirection: 'ASC',
			},
			{
				key: 'actions',
				label: 'Aktionen',
				textAlign: 'center',
				width: 180,
			},
		],
	],
};

const transformDataWithActions = (data: DataRow[]) =>
	data.map((row) => ({
		...row,
		actions: {
			buttons: createRowActions(row),
		},
	}));

export const TableActionColumnPerformance: FC = () => (
	<>
		<SampleDescription>
			<p>
				Performance demo: {ROWS_COUNT} rows, actions per row are bound directly via the <code>actions</code> property. No custom render functions, so the table
				can render action buttons without extra portals or timeouts.
			</p>
			<p>
				Use this version to compare render speed against older approaches and to see how action configs stay type safe with <code>ButtonProps</code>.
			</p>
		</SampleDescription>

		<section className="w-full">
			<KolTableStateful _label="Benutzerverwaltung mit Action-Spalte" _headers={HEADERS} _data={transformDataWithActions(DATA)} className="block" />
		</section>
	</>
);
