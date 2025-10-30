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
];

export const TableSettingsColumnOptions: FC = () => (
	<>
		<SampleDescription>
			<p>
				This example demonstrates how the table settings respect column metadata. Some columns can be hidden, reordered, or sized, while others stay locked
				based on their <code>hidable</code>, <code>sortable</code>, and <code>sizable</code> flags.
			</p>
		</SampleDescription>

		<KolTableStateful
			_label="Table with column option restrictions"
			_minWidth="auto"
			_hasSettingsMenu
			_headers={{
				horizontal: [
					[
						{ key: 'id', label: 'ID', hidable: false, sortable: false },
						{ key: 'name', label: 'Name' },
						{ key: 'team', label: 'Team', sortable: false },
						{ key: 'email', label: 'E-Mail', sizable: false },
						{ key: 'status', label: 'Status', hidable: false, sizable: false },
					],
				],
			}}
			_tableSettings={{
				columns: [
					{ key: 'id', label: 'ID', visible: true, width: 15, hidable: false, sortable: false },
					{ key: 'name', label: 'Name', visible: true, width: 30 },
					{ key: 'team', label: 'Team', visible: true, width: 20, sortable: false },
					{ key: 'email', label: 'E-Mail', visible: true, width: 25, sizable: false },
					{ key: 'status', label: 'Status', visible: true, width: 10, hidable: false, sizable: false },
				],
			}}
			_data={DATA}
			className="block"
			style={{ maxWidth: '720px' }}
		/>
	</>
);
