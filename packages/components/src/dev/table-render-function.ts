import type { KoliBriTableCell, KoliBriTableHeaders } from '../schema';

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

				/* Example 1: Use render return value to format data */
				render: (_el, cell: KoliBriTableCell) => `Index: ${cell.label}`,
			},
			{
				label: 'Status',
				key: 'shipped',

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

				/* Example 3: Render function using innerHTML. ⚠️Make sure to sanitize data to avoid XSS. */
				render: (el, cell) => {
					el.innerHTML = `<strong>${Intl.DateTimeFormat('de-DE').format(cell.label as unknown as Date)}</strong>`;
				},
				sort: (data) => data.sort((data0, data1) => (data0 as Data).date.getTime() - (data1 as Data).date.getTime()),
			},
		],
	],
};

const container = document.getElementById('table-container');
const table = document.createElement('kol-table');

table._label = 'Table example with render functions';
table._data = DATA;
table._headers = HEADERS;
container?.appendChild(table);
