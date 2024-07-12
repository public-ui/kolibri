import type { FC } from 'react';
import React from 'react';
import { KolTable } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const TableWithFooter: FC = () => (
	<>
		<SampleDescription>This sample shows KolTable with footer data.</SampleDescription>

		<KolTable
			_label="Business hours"
			_headers={{
				horizontal: [
					[
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
					],
				],
			}}
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
			_dataFoot={[
				{
					tuesday: "Lunch break from 11 to 14 o'clock",
				},
			]}
		/>
	</>
);
