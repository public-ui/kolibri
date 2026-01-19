import type { KoliBriTableHeaderCellWithLogic } from '@public-ui/components';
import { KolTableStateful } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

type ProjectTask = {
	id: string;
	project: string;
	owner: string;
};

const HEADERS: { horizontal: KoliBriTableHeaderCellWithLogic[][] } = {
	horizontal: [
		[
			{ key: 'id', label: 'ID', width: 80 },
			{ key: 'project', label: 'Project' },
			{ key: 'owner', label: 'Owner', width: 140 },
			{
				type: 'action',
				key: 'actions',
				label: 'Actions',
				textAlign: 'center',
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
						{
							type: 'button',
							_label: 'Start',
							_icons: 'kolicon-chevron-right',
							_variant: 'secondary',
							_on: {
								onClick: () => alert(`Start task ${simpleRow.id}`),
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
];

export const TableActionColumns: FC = () => (
	<>
		<SampleDescription>
			<p>
				Simple example using the refactored action column: Actions are defined once in the column header definition using a factory function. Two rows with
				inline action buttons demonstrate clean separation between data and UI behavior.
			</p>
		</SampleDescription>

		<section className="w-full">
			<KolTableStateful _label="Tasks with action buttons" _headers={HEADERS} _data={DATA} className="block" />
		</section>
	</>
);
