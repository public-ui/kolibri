import type { KoliBriTableHeaderCellWithLogic } from '@public-ui/components';
import { KolTableStateful } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleBlock } from '../SampleBlock';
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
						{
							type: 'link',
							_label: 'View',
							_href: `#/back-page?taskId=${simpleRow.id}`,
							_target: '_blank',
							_icons: 'kolicon-external-link',
							_hideLabel: false,
						},
					];
				},
			},
			{
				type: 'action',
				key: 'externalActions',
				label: 'External Actions',
				width: 280,
				actions: (row) => {
					const simpleRow = row as ProjectTask;
					return [
						{
							type: 'link',
							_label: 'View on Dashboard',
							_href: `#/back-page?taskId=${simpleRow.id}`,
							_target: '_blank',
							_icons: 'kolicon-external-link',
							_hideLabel: false,
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

		<SampleBlock id="action-columns" className="w-full">
			<KolTableStateful _label="Tasks with action buttons" _headers={HEADERS} _data={DATA} className="block" />
		</SampleBlock>
	</>
);
