import type { KoliBriTableHeaderCellWithLogic } from '@public-ui/components';
import { KolTableStateful } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import type { StateColumnPropType } from '../../../../../components/dist/types/schema';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

type ProjectTask = {
	id: string;
	project: string;
	owner: string;
	state: StateColumnPropType[];
};

const HEADERS: { horizontal: KoliBriTableHeaderCellWithLogic[][] } = {
	horizontal: [
		[
			{ key: 'id', label: 'ID', width: 80 },
			{ key: 'project', label: 'Project' },
			{ key: 'owner', label: 'Owner', width: 140 },
			{
				type: 'state',
				key: 'states',
				label: 'States',
				textAlign: 'left',
				width: 500,
				states: (row) => (row as ProjectTask).state,
			},
		],
	],
};

const DATA: ProjectTask[] = [
	{
		id: 'T-01',
		project: 'Onboarding checklist',
		owner: 'Alex Rivera',
		state: [
			{
				type: 'badge',
				_label: 'Vacation',
				_color: '#aa0000',
			},
			{
				type: 'badge',
				_label: 'In Project',
				_color: '#0000aa',
			},
		],
	},
	{
		id: 'T-02',
		project: 'Accessibility audit',
		owner: 'Jamie Chen',
		state: [
			{
				type: 'badge',
				_label: 'At Work',
				_color: '#00aa00',
			},
		],
	},
];

export const TableStateColumns: FC = () => (
	<>
		<SampleDescription>
			<p>Simple example using the state column: States are defined once in the column header definition using a factory function.</p>
		</SampleDescription>

		<SampleBlock id="action-columns" className="w-full">
			<KolTableStateful _label="Tasks with action buttons" _headers={HEADERS} _data={DATA} className="block" />
		</SampleBlock>
	</>
);
