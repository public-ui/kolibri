import { KolTableStateful } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';
import { ensureHeaderWidths } from './utils';

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
				This example demonstrates how the table settings respect column metadata. Some columns can be hidden, reordered, or resized, while others stay locked
				based on their <code>hidable</code>, <code>sortable</code>, and <code>resizable</code> flags.
			</p>
		</SampleDescription>

		<KolTableStateful
			_label="Table with column option restrictions"
			_hasSettingsMenu
			_headers={ensureHeaderWidths({
				horizontal: [
					[
						{ key: 'id', label: 'ID', hidable: false, sortable: false, visible: true, width: 240 },
						{ key: 'name', label: 'Name', visible: true, width: 480 },
						{ key: 'team', label: 'Team', sortable: false, visible: true, width: 320 },
						{ key: 'email', label: 'E-Mail', resizable: false, visible: true, width: 400 },
						{ key: 'status', label: 'Status', hidable: false, resizable: false, visible: true, width: 160 },
					],
				],
			})}
			_data={DATA}
			className="block"
			style={{ maxWidth: '720px' }}
		/>
	</>
);
