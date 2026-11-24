import type { SortData } from '../../../../internals/src/controller/table-stateful/model';
import type { KoliBriTableDataType, KoliBriTableHeaderCellWithLogic, KoliBriTableHeaders } from '../../../../internals/src/schema/index';
import { KolTableStateful } from '../component';

/**
 * Regression tests for #11645: the active sort must survive a `_headers` update that keeps the column
 * structure (a new object with the same keys, common with inline headers in React), and a declared
 * `sortDirection` must survive header rows without sortable cells.
 */
type Internal = {
	headers: KoliBriTableHeaders;
	sortData: SortData[];
	sortedData: KoliBriTableDataType[];
	data: KoliBriTableDataType[];
	watchHeaders: (value?: unknown) => void;
	resetSort: () => Promise<void>;
	updateSortedData: () => void;
};

const byId = (a: KoliBriTableDataType, b: KoliBriTableDataType) => (a as { id: number }).id - (b as { id: number }).id;
const byCity = (a: KoliBriTableDataType, b: KoliBriTableDataType) => (a as { city: string }).city.localeCompare((b as { city: string }).city);

const ID: KoliBriTableHeaderCellWithLogic = { key: 'id', label: 'ID', compareFn: byId };
const CITY: KoliBriTableHeaderCellWithLogic = { key: 'city', label: 'City', compareFn: byCity };

const HEADERS: KoliBriTableHeaders = { horizontal: [[{ ...ID }, { ...CITY }]] };

const ROWS: { id: number; city: string }[] = [
	{ id: 3, city: 'Berlin' },
	{ id: 1, city: 'Aachen' },
	{ id: 2, city: 'Bonn' },
];

const makeSortedTable = (): Internal => {
	const table = new KolTableStateful() as unknown as Internal;
	table.data = ROWS as KoliBriTableDataType[];
	table.watchHeaders(HEADERS);
	jest.runAllTimers();
	// Simulate a click on the id column: sorted by id ascending.
	table.sortData = [{ label: 'ID', key: 'id', compareFn: byId, direction: 'ASC' }];
	table.updateSortedData();
	return table;
};

describe('KolTableStateful sort persistence (#11645)', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('keeps the active sort when the headers are re-set with the same columns', () => {
		const table = makeSortedTable();

		table.watchHeaders({ horizontal: [[{ ...ID }, { ...CITY }]] });

		expect(table.sortData.map((entry) => `${entry.key}:${entry.direction}`)).toEqual(['id:ASC']);
		expect(table.sortedData.map((row) => (row as { id: number }).id)).toEqual([1, 2, 3]);
	});

	it('re-initializes the sort from the declared sortDirection when the columns change', () => {
		const table = makeSortedTable();

		table.watchHeaders({ horizontal: [[{ ...ID, sortDirection: 'DESC' }]] });
		jest.runAllTimers();

		expect(table.sortData.map((entry) => `${entry.key}:${entry.direction}`)).toEqual(['id:DESC']);
		expect(table.sortedData.map((row) => (row as { id: number }).id)).toEqual([3, 2, 1]);
	});

	it('re-reads the declared sort via resetSort() after a non-structural header update', async () => {
		const table = makeSortedTable();

		// The declared sort of a same-column update does not replace the active sort …
		table.watchHeaders({ horizontal: [[{ ...ID }, { ...CITY, sortDirection: 'DESC' }]] });
		expect(table.sortData.map((entry) => `${entry.key}:${entry.direction}`)).toEqual(['id:ASC']);

		// … but resetSort() applies it.
		await table.resetSort();
		expect(table.sortData.map((entry) => `${entry.key}:${entry.direction}`)).toEqual(['city:DESC']);
		expect(table.sortedData.map((row) => (row as { id: number }).id)).toEqual([2, 3, 1]);
	});

	it('applies the declared sort of an earlier header row when a later row has no sortable cell', () => {
		const table = new KolTableStateful() as unknown as Internal;
		table.data = ROWS as KoliBriTableDataType[];
		table.watchHeaders({ horizontal: [[{ ...CITY, sortDirection: 'ASC' }], [{ label: 'Group', colSpan: 2 }]] });
		jest.runAllTimers();

		expect(table.sortData.map((entry) => `${entry.key}:${entry.direction}`)).toEqual(['city:ASC']);
		expect(table.sortedData.map((row) => (row as { id: number }).id)).toEqual([1, 3, 2]);
	});
});
