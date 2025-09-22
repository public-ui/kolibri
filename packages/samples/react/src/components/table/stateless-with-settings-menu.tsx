import type { FC } from 'react';
import React from 'react';
import { KolTableStateless } from '@public-ui/react-v19';
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
				<code>_hasSettingsMenu</code>.
			</p>
		</SampleDescription>

		<KolTableStateless
			_label="Users (stateless with settings menu)"
			_minWidth="auto"
			className="w-full"
			_hasSettingsMenu={true}
			_headerCells={{
				horizontal: [
					[
						{ key: 'id', label: 'ID', textAlign: 'center' },
						{ key: 'name', label: 'Name', textAlign: 'center' },
						{ key: 'role', label: 'Role', textAlign: 'center' },
						{ key: 'email', label: 'E-Mail', textAlign: 'center' },
						{ key: 'active', label: 'Active', textAlign: 'center' },
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
