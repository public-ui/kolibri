import type { FC } from 'react';
import React from 'react';
import { KolTableStateful } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const TableWithFooter: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolTableStateful with footer data.</p>
		</SampleDescription>

		<KolTableStateful
			className="w-full"
			_label="Business hours"
			_minWidth="auto"
			_headers={{
				horizontal: [
					[
						{
							label: 'District',
							key: 'asp',
							minWidth: 'auto',
						},
						{
							label: 'Monday',
							key: 'monday',
							minWidth: 'auto',
						},
						{
							label: 'Tuesday',
							key: 'tuesday',
							minWidth: 'auto',
						},
						{
							label: 'Wednesday',
							key: 'wednesday',
							minWidth: 'auto',
						},
						{
							label: 'Thursday',
							key: 'thursday',
							minWidth: 'auto',
						},
						{
							label: 'Friday',
							key: 'friday',
							minWidth: 'auto',
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
