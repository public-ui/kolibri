import type { FC } from 'react';
import React from 'react';

import type { KoliBriTableHeaders } from '@public-ui/components';
import { KolTable } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

type TemperatureRow = {
	city: string;
	temperature: number;
};

const COMFORTABLE_TEMPERATURE = 22;

const TEMPERATURE_DATA: TemperatureRow[] = [
	{ city: 'Reykjavík', temperature: 6 },
	{ city: 'Berlin', temperature: 21 },
	{ city: 'Palma de Mallorca', temperature: 29 },
	{ city: 'Cairo', temperature: 35 },
	{ city: 'Helsinki', temperature: 14 },
];

const HEADERS: KoliBriTableHeaders = {
	horizontal: [
		[
			{ label: 'City', key: 'city' },
			{
				label: 'Temperature (°C)',
				key: 'temperature',
				textAlign: 'right',
				compareFn: (rowA, rowB, direction = 'ASC') => {
					const temperatureA = (rowA as TemperatureRow).temperature;
					const temperatureB = (rowB as TemperatureRow).temperature;
					const differenceA = Math.abs(temperatureA - COMFORTABLE_TEMPERATURE);
					const differenceB = Math.abs(temperatureB - COMFORTABLE_TEMPERATURE);

					if (differenceA !== differenceB) {
						return direction === 'DESC' ? differenceB - differenceA : differenceA - differenceB;
					}

					return direction === 'DESC' ? temperatureB - temperatureA : temperatureA - temperatureB;
				},
				render: (_element, _cell, row) => {
					const difference = Math.abs((row as TemperatureRow).temperature - COMFORTABLE_TEMPERATURE);
					return `${(row as TemperatureRow).temperature} °C (Δ ${difference} °C)`;
				},
			},
		],
	],
};

export const TableDirectionAwareSort: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample demonstrates how <code>compareFn</code> receives the current <code>sortDirection</code>. Ascending sorts show cities that are closest to
				22&nbsp;°C first, descending sorts highlight the most extreme temperatures.
			</p>
		</SampleDescription>

		<section className="w-full">
			<KolTable _label="Direction aware compare function" _data={TEMPERATURE_DATA} _headers={HEADERS} className="block" />
		</section>
	</>
);
