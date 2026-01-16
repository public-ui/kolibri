import type { ButtonProps, KoliBriTableHeaderCellWithLogic } from '@public-ui/components';
import { KolTableStateful } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

type SimpleRow = {
	id: string;
	project: string;
	owner: string;
	actions: {
		buttons: ButtonProps[];
	};
};

const HEADERS: { horizontal: KoliBriTableHeaderCellWithLogic[][] } = {
	horizontal: [
		[
			{ key: 'id', label: 'ID', width: 80 },
			{ key: 'project', label: 'Project' },
			{ key: 'owner', label: 'Owner', width: 140 },
			{ key: 'actions', label: 'Actions', textAlign: 'center', width: 250 },
		],
	],
};

const DATA: SimpleRow[] = [
	{
		id: 'T-01',
		project: 'Onboarding checklist',
		owner: 'Alex Rivera',
		actions: {
			buttons: [
				{
					_label: 'Details',
					_icons: 'kolicon-eye',
					_hideLabel: true,
					_on: {
						onClick: () => alert('Details: T-01 - Onboarding checklist'),
					},
				},
				{
					_label: 'Start',
					_icons: 'kolicon-play',
					_variant: 'secondary',
					_on: {
						onClick: () => alert('Start task T-01'),
					},
				},
			],
		},
	},
	{
		id: 'T-02',
		project: 'Accessibility audit',
		owner: 'Jamie Chen',
		actions: {
			buttons: [
				{
					_label: 'Details',
					_icons: 'kolicon-eye',
					_hideLabel: true,
					_variant: 'ghost',
					_on: {
						onClick: () => alert('Details: T-02 - Accessibility audit'),
					},
				},
				{
					_label: 'Mark done',
					_icons: 'kolicon-check',
					_variant: 'secondary',
					_on: {
						onClick: () => alert('Completed task T-02'),
					},
				},
			],
		},
	},
];

export const TableActionColumns: FC = () => (
	<>
		<SampleDescription>
			<p>Default example: two rows with inline action buttons. Everything is in plain sight so you can copy and adapt quickly.</p>
		</SampleDescription>

		<section className="w-full">
			<KolTableStateful _label="Tasks with action buttons" _headers={HEADERS} _data={DATA} className="block" />
		</section>
	</>
);
