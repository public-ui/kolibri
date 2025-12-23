import { KolTableStateful } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const TableComplexHeaders: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolTableStateful using vertical and horizontal headers, applying colspan and rowspan.</p>
		</SampleDescription>

		<section className="w-full flex flex-col">
			<KolTableStateful
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
					vertical: [
						[
							{
								label: 'Berlin',
								rowSpan: 2,
								width: 160,
							},
							{
								label: 'München',
								width: 160,
							},
						],
					],
					horizontal: [
						[
							{
								label: 'District',
								rowSpan: 2,
								key: 'asp',
								width: 160,
							},
							{
								label: 'Workdays',
								colSpan: 5,
								width: 160,
							},
							{
								label: 'Weekend',
								colSpan: 2,
								width: 160,
							},
						],
						[
							{
								label: 'Monday',
								key: 'monday',
								width: 160,
							},
							{
								label: 'Tuesday',
								key: 'tuesday',
								width: 160,
							},
							{
								label: 'Wednesday',
								key: 'wednesday',
								width: 160,
							},
							{
								label: 'Thursday',
								key: 'thursday',
								width: 160,
							},
							{
								label: 'Friday',
								key: 'friday',
								width: 160,
							},
							{
								label: 'Saturday',
								key: 'saturday',
								width: 160,
							},
							{
								label: 'Sunday',
								key: 'sunday',
								width: 160,
							},
						],
					],
				}}
			/>
		</section>
	</>
);
