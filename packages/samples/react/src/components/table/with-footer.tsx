import { KolTableStateful } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const TableWithFooter: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolTableStateful with footer data.</p>
		</SampleDescription>

		<SampleBlock id="with-footer">
			<KolTableStateful
				className="w-full"
				_label="Business hours"
				_headers={{
					horizontal: [
						[
							{
								label: 'District',
								key: 'asp',
								width: 160,
							},
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
		</SampleBlock>
	</>
);
