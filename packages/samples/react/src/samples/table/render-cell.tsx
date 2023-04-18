import React from 'react';
import { KoliBriTableHeaders } from '@public-ui/components/dist/types/types/table';

import { KolButton, KolInputText, KolTable } from '@public-ui/react';

import React, { FC } from 'react';

import { getRoot } from '../../shares/react-roots';

const DATE_FORMATTER = Intl.DateTimeFormat('de-DE', {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
});

type Data = {
	order: number;
	date: Date;
};
const DATA: Data[] = [];

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
							<KolInputText _id="test">Eingabe</KolInputText>
						</>
					);
				},
			},
		],
	],
};

new Array(15).fill(null).forEach((_v, idx) => {
	const rand = Math.round(Math.random() * 999999999999);
	DATA.push({
		order: idx,
		date: new Date(rand),
	});
});

export const TableRenderCell: FC = () => <KolTable _caption="Sort a date column" _data={DATA} _headers={HEADERS} />;
