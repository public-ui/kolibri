import type { FC } from 'react';
import React from 'react';

import { KolBadge, KolTable } from '@public-ui/react';

import { getRoot } from '../../shares/react-roots';
import { DATA } from './test-data';
import { SampleDescription } from '../SampleDescription';

import type { KoliBriTableHeaders } from '@public-ui/components';
import type { Data } from './test-data';
const DATE_FORMATTER = Intl.DateTimeFormat('de-DE', {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
});

const HEADERS: KoliBriTableHeaders = {
	horizontal: [
		[
			{ label: 'order', key: 'order', textAlign: 'center', width: '10em' },
			{
				label: 'date',
				key: 'date',
				textAlign: 'center',
				width: '20em',
				render: (_el, _cell, tupel) => DATE_FORMATTER.format((tupel as Data).date),
				sort: (data: Data[]) =>
					data.sort((data0, data1) => {
						if (data0.date < data1.date) return -1;
						else if (data1.date < data0.date) return 1;
						else return 0;
					}),
			},
			{
				label: 'Aktion',
				key: 'order',
				render: (el, cell, tupel) => {
					getRoot(el).render(
						<KolBadge
							style={{
								backgroundColor: 'red',
								width: '80%',
							}}
							_icons="codicon codicon-location"
							_label={'Speichern'}
						/>,
					);
				},
			},
		],
	],
};

export const TableBadgeSize: FC = () => (
	<>
		<SampleDescription>
			<p>
				Hier ist eine Tabelle, die durch anklicken des Knopfes sortiert werden kann. Entweder nach der Reihenfolge, nach dem ältesten Datum oder nach dem
				jüngsten Datum.
			</p>
		</SampleDescription>
		<KolTable _label="Sort a date column" _data={DATA} _headers={HEADERS} className="block min-w-75em" />
	</>
);
