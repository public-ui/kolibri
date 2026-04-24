import type { KoliBriTableCell, KoliBriTableHeaderCellWithLogic } from '@public-ui/components';
import { KolTableStateful } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

type ProjectTask = {
	id: string;
	project: string;
	owner: string;
	react: string;
};

const HEADERS: { horizontal: KoliBriTableHeaderCellWithLogic[][] } = {
	horizontal: [
		[
			{ key: 'project', label: 'Project' },
			{ key: 'owner', label: 'Owner', width: 140 },
			{
				label: 'ID',
				key: 'id',
				width: 100,

				render: (_el, cell: KoliBriTableCell) => {
					const { label } = cell as { label: string };
					return `Index: ${label}`;
				},
			},
			{
				type: 'action',
				key: 'actions',
				label: 'Actions',
				width: 100,
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
		react: 'test',
	},
	{
		id: 'T-02',
		project: 'Accessibility audit',
		owner: 'Jamie Chen',
		react: 'test',
	},
];

export const TableActionAndRenderColumns: FC = () => (
	<>
		<SampleDescription>
			<p>
				Simple example using the refactored action column: Actions are defined once in the column header definition using a factory function. Two rows with
				inline action buttons demonstrate clean separation between data and UI behavior.
			</p>
		</SampleDescription>

		<section className="w-full">
			<KolTableStateful _label="Tasks with action buttons" _headers={HEADERS} _data={DATA} className="block" _hasSettingsMenu />
		</section>
	</>
);
