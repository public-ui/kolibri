import type { KoliBriTableDataType, KoliBriTableHeaders } from '@public-ui/components';
import { KolTableStateful } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

type UserRow = {
	id: string;
	name: string;
	team: string;
	email: string;
	status: string;
};

const DATA: UserRow[] = [
	{ id: 'U-001', name: 'Andrea Schmidt', team: 'Design', email: 'andrea@example.org', status: 'Active' },
	{ id: 'U-002', name: 'Boris Klein', team: 'Engineering', email: 'boris@example.org', status: 'Active' },
	{ id: 'U-003', name: 'Chiara Russo', team: 'Support', email: 'chiara@example.org', status: 'On leave' },
	{ id: 'U-004', name: 'Dmitri Volkov', team: 'Engineering', email: 'dmitri@example.org', status: 'Active' },
	{ id: 'U-005', name: 'Elena Costa', team: 'Design', email: 'elena@example.org', status: 'On leave' },
	{ id: 'U-006', name: 'Farid Haddad', team: 'Support', email: 'farid@example.org', status: 'Active' },
];

const compareByKey =
	(key: keyof UserRow) =>
	(data0: KoliBriTableDataType, data1: KoliBriTableDataType, direction = 'ASC') => {
		const result = String((data0 as UserRow)[key]).localeCompare(String((data1 as UserRow)[key]));
		return direction === 'DESC' ? -result : result;
	};

const HEADERS: KoliBriTableHeaders = {
	horizontal: [
		[
			{ key: 'id', label: 'ID', visible: true, width: 120 },
			{ key: 'name', label: 'Name', visible: true, width: 240, compareFn: compareByKey('name') },
			{ key: 'team', label: 'Team', visible: true, width: 200, compareFn: compareByKey('team') },
			{ key: 'email', label: 'E-Mail', visible: true, width: 280 },
			{ key: 'status', label: 'Status', visible: true, width: 160, compareFn: compareByKey('status') },
		],
	],
};

export const TableStatefulSettingsPersistence: FC = () => (
	<>
		<SampleDescription>
			<p>
				This example demonstrates that column settings applied via the settings menu are remembered. Open the settings menu and change a column&apos;s width,
				visibility or order and apply. Then sort a column, switch the pagination page or select a row &ndash; the customized columns must stay as you
				configured them and must no longer reset to their defaults (issue #10344).
			</p>
		</SampleDescription>

		<KolTableStateful
			_label="Table that remembers settings across sorting, pagination and selection"
			_hasSettingsMenu
			_pagination={{ _page: 1, _pageSize: 3 }}
			_selection={{
				label: (row) => `Select ${(row as UserRow).name}`,
				keyPropertyName: 'id',
				selectedKeys: [],
			}}
			_headers={HEADERS}
			_data={DATA}
			className="block"
			style={{ maxWidth: '900px' }}
		/>
	</>
);
