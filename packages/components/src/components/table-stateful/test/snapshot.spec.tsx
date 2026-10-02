import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import type { KoliBriTableDataType, KoliBriTableHeaders } from '../../../schema';
import { KolPaginationWc } from '../../pagination/wc';
import { KolTableStatelessWc } from '../../table-stateless/wc';
import { KolTableStateful } from '../shadow';

type Row = { id: number; name: string; city: string };

const compareNumber = (a: KoliBriTableDataType, b: KoliBriTableDataType) => (a as Row).id - (b as Row).id;
const compareString = (key: keyof Row) => (a: KoliBriTableDataType, b: KoliBriTableDataType) => String((a as Row)[key]).localeCompare(String((b as Row)[key]));

const CITIES = ['Berlin', 'Hamburg', 'Bonn'];
const ROWS: Row[] = Array.from({ length: 23 }, (_, index) => ({ id: 23 - index, name: `Name ${(index * 7) % 23}`, city: CITIES[index % 3] }));
const FEW_ROWS = ROWS.slice(0, 4);

const headers = (sort?: { id?: 'ASC' | 'DESC'; city?: 'ASC' | 'DESC' }): KoliBriTableHeaders => ({
	horizontal: [
		[
			{ key: 'id', label: 'ID', compareFn: compareNumber, sortDirection: sort?.id },
			{ key: 'name', label: 'Name' },
			{ key: 'city', label: 'City', compareFn: compareString('city'), sortDirection: sort?.city },
		],
	],
});

type Case = [string, Record<string, unknown>];

/**
 * The cases cover the derived state of `kol-table-stateful`: sorting, pagination (position, page, page
 * size, options), selection and the props passed through to the stateless table. The table fills its
 * sorted data in a timeout, so each case waits for it before taking the snapshot.
 */
const CASES: Case[] = [
	['data without sorting', { _label: 'Table', _headers: headers(), _data: FEW_ROWS }],
	[
		'data and headers as JSON strings',
		{ _label: 'Table', _headers: JSON.stringify({ horizontal: [[{ key: 'id', label: 'ID' }]] }), _data: JSON.stringify(FEW_ROWS) },
	],
	['an initial ascending sort', { _label: 'Table', _headers: headers({ id: 'ASC' }), _data: FEW_ROWS }],
	['an initial descending sort', { _label: 'Table', _headers: headers({ city: 'DESC' }), _data: FEW_ROWS }],
	['two initial sorts without multi sort', { _label: 'Table', _headers: headers({ id: 'DESC', city: 'ASC' }), _data: FEW_ROWS }],
	['two initial sorts with multi sort', { _label: 'Table', _allowMultiSort: true, _headers: headers({ city: 'ASC', id: 'DESC' }), _data: FEW_ROWS }],
	[
		'horizontal and vertical headers, which disable sorting',
		{
			_label: 'Table',
			_headers: { ...headers({ id: 'ASC' }), vertical: [[{ label: 'Row' }]] },
			_data: FEW_ROWS,
		},
	],
	['pagination true', { _label: 'Table', _headers: headers(), _data: ROWS, _pagination: true }],
	['pagination as empty string', { _label: 'Table', _headers: headers(), _data: ROWS, _pagination: '' }],
	['pagination false', { _label: 'Table', _headers: headers(), _data: ROWS, _pagination: false }],
	[
		'pagination object on the second page at the top',
		{ _label: 'Table', _headers: headers(), _data: ROWS, _pagination: { _page: 2, _pageSize: 5, _pageSizeOptions: [5, 10] }, _paginationPosition: 'top' },
	],
	[
		'pagination as JSON string on both positions',
		{ _label: 'Table', _headers: headers(), _data: ROWS, _pagination: JSON.stringify({ _page: 3, _pageSize: 10 }), _paginationPosition: 'both' },
	],
	[
		'pagination with boundary and sibling count and its own max',
		{
			_label: 'Table',
			_headers: headers(),
			_data: ROWS,
			_pagination: { _page: 4, _pageSize: 2, _max: 20, _boundaryCount: 2, _siblingCount: 0, _hasButtons: { first: false, last: false } },
		},
	],
	['pagination without data', { _label: 'Table', _headers: headers(), _data: [], _pagination: true }],
	[
		'a multiple selection',
		{
			_label: 'Table',
			_headers: headers(),
			_data: FEW_ROWS,
			_selection: {
				label: (row: KoliBriTableDataType) => `Select ${(row as Row).name}`,
				keyPropertyName: 'id',
				multiple: true,
				selectedKeys: [FEW_ROWS[1].id],
			},
		},
	],
	[
		'the props passed to the stateless table',
		{
			_label: 'Table',
			_headers: headers(),
			_data: FEW_ROWS,
			_dataFoot: [{ id: 0, name: 'Sum', city: '' }],
			_fixedCols: [1, 0],
			_hasSettingsMenu: true,
			_loading: true,
			_variant: 'custom',
		},
	],
];

describe('kol-table-stateful', () => {
	it.each(CASES)('should render with %s', async (_, props) => {
		const page = await newSpecPage({
			components: [KolTableStateful, KolTableStatelessWc, KolPaginationWc],
			template: () => h('kol-table-stateful', props),
		});
		await new Promise((resolve) => setTimeout(resolve));
		await page.waitForChanges();

		expect(page.root).toMatchSnapshot();
	});
});
