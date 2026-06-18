import { KolTableStateless } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

type Data = {
	id: string;
	name: string;
	role: string;
	email: string;
	active: string;
};
const DATA: Data[] = [
	{ id: 'U1001', name: 'Alice Johnson', role: 'Admin', email: 'alice@example.org', active: 'Yes' },
	{ id: 'U1002', name: 'Bob Smith', role: 'Editor', email: 'bob@example.org', active: 'No' },
	{ id: 'U1003', name: 'Carol Lee', role: 'Viewer', email: 'carol@example.org', active: 'Yes' },
	{ id: 'U1004', name: 'David Kim', role: 'Editor', email: 'david@example.org', active: 'Yes' },
];

export const TableStatelessWithSettingsMenu: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample shows <code>KolTableStateless</code> with the settings menu enabled via
				<code>_hasSettingsMenu</code>. Each column demonstrates a different combination of sorting and resizing options.
			</p>
			<ul>
				<li>
					<strong>ID</strong> keeps a fixed width with <code>resizable: false</code> while still allowing sorting.
				</li>
				<li>
					<strong>Name</strong> represents the default behavior with both sorting and resizing enabled and a preset <code>width</code> of 220px, which
					is shown as the current value in the settings menu.
				</li>
				<li>
					<strong>Role</strong> disables sorting but keeps <code>resizable: true</code> with a preset <code>width</code> of 160px so users can adjust it
					starting from its current value.
				</li>
				<li>
					<strong>E-Mail</strong> allows sorting but locks its width with <code>resizable: false</code> to keep the layout stable.
				</li>
				<li>
					<strong>Active</strong> is neither sortable nor resizable to emphasise the status indicator.
				</li>
			</ul>
		</SampleDescription>

		<KolTableStateless
			_label="Users (stateless with settings menu)"
			className="w-full"
			_hasSettingsMenu={true}
			_headerCells={{
				horizontal: [
					[
						{
							key: 'id',
							label: 'ID',
							textAlign: 'center',
							sortDirection: 'NOS',
							sortable: true,
							resizable: false,
						},
						{
							key: 'name',
							label: 'Name',
							textAlign: 'center',
							sortDirection: 'NOS',
							sortable: true,
							resizable: true,
							width: 220,
						},
						{
							key: 'role',
							label: 'Role',
							textAlign: 'center',
							sortDirection: 'NOS',
							sortable: false,
							resizable: true,
							width: 160,
						},
						{
							key: 'email',
							label: 'E-Mail',
							textAlign: 'center',
							sortDirection: 'NOS',
							sortable: true,
							resizable: false,
						},
						{
							key: 'active',
							label: 'Active',
							textAlign: 'center',
							sortDirection: 'NOS',
							sortable: false,
							resizable: false,
						},
					],
				],
			}}
			_data={DATA}
			_on={{
				onSort: (_e, payload) => console.log('sort', payload),
				onSelectionChange: (_e, value) => console.log('selection', value),
			}}
		/>
	</>
);
