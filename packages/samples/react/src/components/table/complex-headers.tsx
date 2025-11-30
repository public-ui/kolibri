import type { FC } from 'react';
import React from 'react';
import { KolTableStateful } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const TableComplexHeaders: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolTableStateful using vertical and horizontal headers, applying colspan and rowspan.</p>
		</SampleDescription>

		<section className="w-full flex flex-col">
			<KolTableStateful
				_label="Business hours"
				_minWidth="auto"
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
					vertical: [
						[
							{
								label: 'Berlin',
								rowSpan: 2,
								minWidth: 'auto',
							},
							{
								label: 'München',
								minWidth: 'auto',
							},
						],
					],
					horizontal: [
						[
							{
								label: 'District',
								rowSpan: 2,
								key: 'asp',
								minWidth: 'auto',
							},
							{
								label: 'Workdays',
								colSpan: 5,
								minWidth: 'auto',
							},
							{
								label: 'Weekend',
								colSpan: 2,
								minWidth: 'auto',
							},
						],
						[
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
							{
								label: 'Saturday',
								key: 'saturday',
								minWidth: 'auto',
							},
							{
								label: 'Sunday',
								key: 'sunday',
								minWidth: 'auto',
							},
						],
					],
				}}
			/>
		</section>
	</>
);
