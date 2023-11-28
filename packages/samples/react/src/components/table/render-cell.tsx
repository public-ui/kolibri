import React, { FC } from 'react';

import { KolButton, KolInputText, KolTable } from '@public-ui/react';

import { getRoot } from '../../shares/react-roots';
import { KoliBriTableHeaders } from '@public-ui/components';
import { DATA, Data } from './test-data';
import { SampleDescription } from '../SampleDescription';

const DATE_FORMATTER = Intl.DateTimeFormat('de-DE', {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
});

const HEADERS: KoliBriTableHeaders = {
	horizontal: [
		[
			{ label: '#', key: 'order', textAlign: 'center' },
			{
				label: 'Datum (string)',
				key: 'date',
				textAlign: 'center',
				render: (el, tupel) => {
					// https://reactjs.org/docs/portals.html
					getRoot(el).render(<strong>{DATE_FORMATTER.format((tupel as Data).date)}</strong>);
				},
				sort: (data: Data[]) =>
					data.sort((data0, data1) => {
						if (data0.date < data1.date) return -1;
						else if (data1.date < data0.date) return 1;
						else return 0;
					}),
			},
			{
				label: 'Aktion (react)',
				key: 'order',
				render: (el) => {
					el.setAttribute('role', 'presentation');

					// https://reactjs.org/docs/portals.html
					getRoot(el).render(
						<>
							<KolButton _label={'Speichern'} />
							<KolInputText _label="Eingabe" />
						</>,
					);
				},
			},
		],
	],
};

export const TableRenderCell: FC = () => (
	<>
		<SampleDescription>
			<p>This sample simulates the usage of React render functions for the table column contents.</p>
		</SampleDescription>
		<KolTable _label="Sort a date column" _data={DATA} _headers={HEADERS} className="block" />
	</>
);
