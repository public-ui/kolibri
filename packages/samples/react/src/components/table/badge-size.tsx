import React, { FC } from 'react';

import { KolBadge, KolTable } from '@public-ui/react';

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
			{ label: 'order', key: 'order', textAlign: 'center' },
			{
				label: 'date',
				key: 'date',
				textAlign: 'center',
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

export const TableBadgeSize: FC = () => <KolTable _label="Sort a date column" _data={DATA} _headers={HEADERS} className="block" />;
