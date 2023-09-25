import React, { FC } from 'react';

import { KolButton, KolInputText, KolTable } from '@public-ui/react';

import { getRoot } from '../../shares/react-roots';
import { KoliBriTableHeaders } from '@public-ui/components';
import { DATA, Data } from './test-data';

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
				render: (_el, _cell, tupel) => `<strong>${DATE_FORMATTER.format((tupel as Data).date)}</strong>`,
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
				render: (el, cell, tupel) => {
					// https://reactjs.org/docs/portals.html
					getRoot(el).render(
						<>
							<KolButton _label={'Speichern'} />
							<KolInputText>Eingabe</KolInputText>
						</>,
					);
				},
			},
		],
	],
};

export const TableRenderCell: FC = () => <KolTable _caption="Sort a date column" _data={DATA} _headers={HEADERS} />;
