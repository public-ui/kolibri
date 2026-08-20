import { KolTableStateful } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const TableComplexHeaders: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolTableStateful using vertical and horizontal headers, applying colspan and rowspan.</p>
		</SampleDescription>

		<section className="w-full flex flex-col" data-visual-block="complex-headers">
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
						saturday: '09:00',
						sunday: '10:00',
					},
					{
						asp: 'Tiergarten',
						monday: '08:00',
						tuesday: '08:00',
						wednesday: '10:00',
						thursday: '11:00',
						friday: '08:00',
						saturday: '09:00',
						sunday: '10:00',
					},
					{
						asp: 'Maxvorstadt',
						monday: '08:00',
						tuesday: '08:00',
						wednesday: '10:00',
						thursday: '11:00',
						friday: '08:00',
						saturday: '09:00',
						sunday: '10:00',
					},
				]}
				_headers={{
					vertical: [
						[
							{
								label: 'Berlin',
								rowSpan: 2,
								width: 100,
							},
							{
								label: 'München',
								width: 100,
							},
						],
					],
					horizontal: [
						[
							{
								label: 'District',
								rowSpan: 2,
								key: 'asp',
								width: 120,
								textAlign: 'center',
							},
							{
								label: 'Workdays',
								colSpan: 5,
								width: 580,
								textAlign: 'center',
							},
							{
								label: 'Weekend',
								colSpan: 2,
								width: 200,
								textAlign: 'center',
							},
						],
						[
							{
								label: 'Monday',
								key: 'monday',
								width: 50,
								textAlign: 'center',
							},
							{
								label: 'Tuesday',
								key: 'tuesday',
								width: 50,
								textAlign: 'center',
							},
							{
								label: 'Wednesday',
								key: 'wednesday',
								width: 50,
								textAlign: 'center',
							},
							{
								label: 'Thursday',
								key: 'thursday',
								width: 50,
								textAlign: 'center',
							},
							{
								label: 'Friday',
								key: 'friday',
								width: 50,
								textAlign: 'center',
							},
							{
								label: 'Saturday',
								key: 'saturday',
								width: 50,
								textAlign: 'center',
							},
							{
								label: 'Sunday',
								key: 'sunday',
								width: 50,
								textAlign: 'center',
							},
						],
					],
				}}
			/>
		</section>
	</>
);
