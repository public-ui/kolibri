import React, { FC } from 'react';

import { KolButton, KolInputText, KolTable } from '@public-ui/react';

import { getRoot } from '../../shares/react-roots';
import { KoliBriTableHeaders } from '@public-ui/components';
import { DATA, Data } from './test-data';
import { DATE_FORMATTER } from './formatter';
import { SampleDescription } from '../SampleDescription';

const HEADERS: KoliBriTableHeaders = {
	horizontal: [
		[
			{
				label: '#',
				key: 'order',
				textAlign: 'center',
				width: '10em',

				/* Example 1: Simple render function using textContent */
				render: (el, cell) => {
					el.textContent = `Index: ${cell.label}`;
				},
			},
			{
				label: 'Datum (string)',
				key: 'date',
				width: '20em',
				textAlign: 'center',

				/* Example 2: Render function using innerHTML. ⚠️Make sure to sanitize data to avoid XSS. */
				render: (el, cell) => {
					el.innerHTML = `<strong>${DATE_FORMATTER.format(cell.label as unknown as Date)}</strong>`;
				},
				sort: (data: Data[]) => data.sort((data0, data1) => data0.date.getTime() - data1.date.getTime()),
			},
			{
				label: 'Aktion (react)',
				key: 'order',

				/* Example 3: Render function using React */
				render: (el) => {
					el.setAttribute('role', 'presentation');

					/* https://react.dev/reference/react-dom/client/createRoot */
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
		<KolTable _label="Sort a date column" _data={DATA} _headers={HEADERS} className="block min-w-75em" />
	</>
);
