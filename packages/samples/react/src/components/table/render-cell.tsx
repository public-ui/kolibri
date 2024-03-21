import React, { FC } from 'react';

import { KolButton, KolInputText, KolTable } from '@public-ui/react';
import { createReactRenderElement } from '@public-ui/components';

import { getRoot } from '../../shares/react-roots';
import { KoliBriTableHeaders } from '@public-ui/components';
import { DATE_FORMATTER } from './formatter';

type Data = {
	order: number;
	date: Date;
	shipped: boolean;
};
const DATA: Data[] = [
	{
		order: 0,
		shipped: false,
		date: new Date('1981-05-26T21:33:43.612Z'),
	},
	{
		order: 1,
		shipped: true,
		date: new Date('1971-04-25T19:44:17.014Z'),
	},
	{
		order: 2,
		shipped: false,
		date: new Date('1986-07-10T11:39:29.539Z'),
	},
];

const HEADERS: KoliBriTableHeaders = {
	horizontal: [
		[
			{
				label: '#',
				key: 'order',
				textAlign: 'center',
				width: '10em',

				/* Example 1: Use render return value to format data */
				render: (_el, cell) => `Index: ${cell.label}`,
			},
			{
				label: 'Status',
				key: 'shipped',
				textAlign: 'center',
				width: '10em',

				/* Example 2: Simple render function using textContent */
				render: (el, cell) => {
					if (cell.label) {
						el.textContent = `Order has been dispatched 🚚`;
					} else {
						el.textContent = `Order pending 📦`;
					}
				},
			},
			{
				label: 'Date (string)',
				key: 'date',
				width: '20em',
				textAlign: 'center',

				/* Example 3: Render function using innerHTML. ⚠️Make sure to sanitize data to avoid XSS. */
				render: (el, cell) => {
					el.innerHTML = `<strong>${DATE_FORMATTER.format(cell.label as unknown as Date)}</strong>`;
				},
				sort: (data: Data[]) => data.sort((data0, data1) => data0.date.getTime() - data1.date.getTime()),
			},
			{
				label: 'Action (react)',
				key: 'order',
				width: '20em',

				/* Example 4: Render function using React */
				render: (el) => {
					getRoot(createReactRenderElement(el)).render(
						<div
							style={{
								display: `grid`,
								gridAutoFlow: `column`,
								alignItems: `end`,
								gap: `1rem`,
								maxWidth: `400px`,
							}}
						>
							<KolInputText _label="Input" />
							<KolButton _label={'Save'} />
						</div>,
					);
				},
			},
		],
	],
};

export const TableRenderCell: FC = () => <KolTable _label="Sort by date column" _data={DATA} _headers={HEADERS} className="block min-w-75em" />;
