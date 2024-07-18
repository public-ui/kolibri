import type { FC } from 'react';
import React from 'react';
import { KolTable } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const TableComplexHeaders: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolTable using vertical and horizontal headers, applying colspan and rowspan.</p>
		</SampleDescription>

		<KolTable
			_label="Business hours"
			_data={[
				{
					asp: 'Center',
					monday: '08:00',
					tuesday: '08:00',
					wednesday: '10:00',
					thursday: '11:00',
					friday: '08:00',
				},
				{
					asp: 'Tiergarten',
					monday: '08:00',
					tuesday: '08:00',
					wednesday: '10:00',
					thursday: '11:00',
					friday: '08:00',
				},
				{
					asp: 'Maxvorstadt',
					monday: '08:00',
					tuesday: '08:00',
					wednesday: '10:00',
					thursday: '11:00',
					friday: '08:00',
				},
			]}
			_headers={{
				vertical: [[{ label: 'Berlin', rowSpan: 2 }, { label: 'München' }]],
				horizontal: [
					[
						{
							label: '',
							colSpan: 7,
						},
						{
							label: 'Weekend',
							colSpan: 2,
						},
					],
					[
						{ label: '' },
						{
							label: 'District',
							key: 'asp',
						},
						{
							label: 'Monday',
							key: 'monday',
						},
						{
							label: 'Tuesday',
							key: 'tuesday',
						},
						{
							label: 'Wednesday',
							key: 'wednesday',
						},
						{
							label: 'Thursday',
							key: 'thursday',
						},
						{
							label: 'Friday',
							key: 'friday',
						},
						{
							label: 'Saturday',
							key: 'saturday',
						},
						{
							label: 'Sunday',
							key: 'sunday',
						},
					],
				],
			}}
		/>
	</>
);
