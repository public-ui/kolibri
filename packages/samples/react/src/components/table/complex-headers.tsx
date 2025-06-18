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
								minWidth: '100px',
							},
							{
								label: 'München',
								minWidth: '100px',
							},
						],
					],
					horizontal: [
						[
							{
								label: 'District',
								rowSpan: 2,
								key: 'asp',
								minWidth: '120px',
							},
							{
								label: 'Workdays',
								colSpan: 5,
								minWidth: '80px',
							},
							{
								label: 'Weekend',
								colSpan: 2,
								minWidth: '80px',
							},
						],
						[
							{
								label: 'Monday',
								key: 'monday',
								minWidth: '80px',
							},
							{
								label: 'Tuesday',
								key: 'tuesday',
								minWidth: '80px',
							},
							{
								label: 'Wednesday',
								key: 'wednesday',
								minWidth: '80px',
							},
							{
								label: 'Thursday',
								key: 'thursday',
								minWidth: '80px',
							},
							{
								label: 'Friday',
								key: 'friday',
								minWidth: '80px',
							},
							{
								label: 'Saturday',
								key: 'saturday',
								minWidth: '80px',
							},
							{
								label: 'Sunday',
								key: 'sunday',
								minWidth: '80px',
							},
						],
					],
				}}
			/>
		</section>
	</>
);
