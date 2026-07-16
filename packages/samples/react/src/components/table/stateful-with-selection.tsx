import type { KoliBriTableDataType, KoliBriTableSelection } from '@public-ui/components';
import { KolTableStateful } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';

import { SampleDescription } from '../SampleDescription';

import type { KoliBriTableHeaderCellWithLogic } from '@public-ui/components';

type ProjectTask = {
	id: string;
	project: string;
	owner: string;
};

const HEADERS: { horizontal: KoliBriTableHeaderCellWithLogic[][] } = {
	horizontal: [
		[
			{ key: 'id', label: 'ID', width: 80 },
			{ key: 'project', label: 'Project', width: 200 },
			{ key: 'owner', label: 'Owner', width: 200 },
			{
				type: 'action',
				key: 'actions',
				label: 'Actions',
				width: 250,
				actions: (row) => {
					const simpleRow = row as ProjectTask;
					return [
						{
							type: 'button',
							_label: 'Details',
							_icons: 'kolicon-eye',
							_hideLabel: true,
							_on: {
								onClick: () => alert(`Details: ${simpleRow.id} - ${simpleRow.project}`),
							},
						},
					];
				},
			},
		],
	],
};

const DATA: ProjectTask[] = [
	{
		id: 'T-01',
		project: 'Onboarding checklist',
		owner: 'Alex Rivera',
	},
	{
		id: 'T-02',
		project: 'Accessibility audit',
		owner: 'Jamie Chen',
	},
	{
		id: 'T-03',
		project: 'UX audit',
		owner: 'Tyler  Gray',
	},
	{
		id: 'T-04',
		project: 'Software Architectur',
		owner: 'Tess Richardson',
	},
];

export const TableStatefulWithSelection: FC = () => {
	const selection: KoliBriTableSelection = {
		label: (row) => `Selection for ${(row as ProjectTask).id}`,
		selectedKeys: ['T-01'],
		disabledKeys: ['T-04'],
		keyPropertyName: 'id',
	};

	const handleSelectionChangeCallback = (_event: Event, selection: KoliBriTableDataType[] | null) => {
		console.log('Selection change via callback', selection);
	};

	return (
		<>
			<SampleDescription>
				<p>
					Simple example using the refactored action column: Actions are defined once in the column header definition using a factory function. Two rows with
					inline action buttons demonstrate clean separation between data and UI behavior.
				</p>
			</SampleDescription>

			<section className="w-full">
				<KolTableStateful
					_label="Tasks with action buttons"
					_headers={HEADERS}
					_data={DATA}
					className="block"
					_selection={selection}
					_on={{ onSelectionChange: handleSelectionChangeCallback }}
				/>
			</section>
		</>
	);
};
