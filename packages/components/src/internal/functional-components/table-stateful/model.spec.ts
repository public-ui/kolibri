import type { KoliBriTableDataType, KoliBriTableHeaderCellWithLogic, KoliBriTableHeaders } from '../../../schema';
import type { SortData } from './model';
import {
	buildHeaderCells,
	changeCellSort,
	findHeaderCell,
	getHeaderCellSortOrder,
	getHeaderCellSortState,
	getSelectedData,
	hasHeadersInBothDirections,
	initializeSortFromHeaders,
	mergeAdjustedHeaderCells,
	selectDisplayedData,
	sortRows,
} from './model';

type Row = { id: number; city: string };

const byId = (a: KoliBriTableDataType, b: KoliBriTableDataType) => (a as Row).id - (b as Row).id;
const byCity = (a: KoliBriTableDataType, b: KoliBriTableDataType) => (a as Row).city.localeCompare((b as Row).city);

const ID: KoliBriTableHeaderCellWithLogic = { key: 'id', label: 'ID', compareFn: byId };
const CITY: KoliBriTableHeaderCellWithLogic = { key: 'city', label: 'City', compareFn: byCity };
const NAME: KoliBriTableHeaderCellWithLogic = { key: 'name', label: 'Name' };

const sorted = (key: string, direction: 'ASC' | 'DESC', compareFn = key === 'id' ? byId : byCity): SortData => ({
	label: key === 'id' ? 'ID' : 'City',
	key,
	compareFn,
	direction,
});

const ROWS: Row[] = [
	{ id: 2, city: 'Bonn' },
	{ id: 3, city: 'Berlin' },
	{ id: 1, city: 'Bonn' },
];

describe('table-stateful model', () => {
	describe('changeCellSort', () => {
		it('cycles a column through ascending, descending and unsorted', () => {
			const ascending = changeCellSort([], ID, false);
			expect(ascending?.map((entry) => entry.direction)).toEqual(['ASC']);
			const descending = changeCellSort(ascending!, ID, false);
			expect(descending?.map((entry) => entry.direction)).toEqual(['DESC']);
			expect(changeCellSort(descending!, ID, false)).toEqual([]);
		});

		it('replaces the sort of another column without multi sort', () => {
			expect(changeCellSort([sorted('city', 'ASC')], ID, false)?.map((entry) => entry.key)).toEqual(['id']);
		});

		it('keeps the other columns with multi sort, in click order', () => {
			expect(changeCellSort([sorted('city', 'ASC')], ID, true)?.map((entry) => `${entry.key}:${entry.direction}`)).toEqual(['city:ASC', 'id:ASC']);
		});

		it('keeps the other columns without multi sort when the first sorted column is clicked', () => {
			expect(changeCellSort([sorted('id', 'ASC'), sorted('city', 'DESC')], ID, false)?.map((entry) => `${entry.key}:${entry.direction}`)).toEqual([
				'id:DESC',
				'city:DESC',
			]);
		});

		it('does not change the passed sort', () => {
			const sortData = [sorted('id', 'ASC')];
			changeCellSort(sortData, ID, false);
			expect(sortData[0].direction).toBe('ASC');
		});

		it('returns undefined for a column without compareFn or of another type', () => {
			expect(changeCellSort([], NAME, false)).toBeUndefined();
			expect(changeCellSort([], { key: 'state', label: 'State', type: 'state' }, false)).toBeUndefined();
		});
	});

	describe('initializeSortFromHeaders', () => {
		it('reads the sort directions of the header cells', () => {
			const result = initializeSortFromHeaders({ horizontal: [[{ ...ID, sortDirection: 'DESC' }, NAME, CITY]] }, false);
			expect(result.sortData.map((entry) => `${entry.key}:${entry.direction}`)).toEqual(['id:DESC']);
			expect(result.hasSortedCells).toBe(true);
			expect(result.missingKey).toBe(false);
		});

		it('keeps only the first sorted column without multi sort and all with multi sort', () => {
			const headers: KoliBriTableHeaders = {
				horizontal: [
					[
						{ ...CITY, sortDirection: 'ASC' },
						{ ...ID, sortDirection: 'DESC' },
					],
				],
			};
			expect(initializeSortFromHeaders(headers, false).sortData.map((entry) => entry.key)).toEqual(['city']);
			expect(initializeSortFromHeaders(headers, true).sortData.map((entry) => entry.key)).toEqual(['city', 'id']);
		});

		it('takes the sort of the last header row, while any row reports sorted cells', () => {
			const result = initializeSortFromHeaders({ horizontal: [[{ ...ID, sortDirection: 'ASC' }], [CITY]] }, false);
			expect(result.sortData).toEqual([]);
			expect(result.hasSortedCells).toBe(true);
		});

		it('reports a sortable column without key', () => {
			const result = initializeSortFromHeaders({ horizontal: [[{ label: 'ID', compareFn: byId, sortDirection: 'ASC' }]] }, false);
			expect(result).toEqual({ sortData: [], hasSortedCells: false, missingKey: true });
		});
	});

	it('detects headers in both directions', () => {
		expect(hasHeadersInBothDirections({ horizontal: [[ID]], vertical: [[NAME]] })).toBe(true);
		expect(hasHeadersInBothDirections({ horizontal: [[ID]], vertical: [] })).toBe(false);
		expect(hasHeadersInBothDirections({ horizontal: [[ID]] })).toBe(false);
	});

	describe('sortRows', () => {
		it('sorts a copy by the columns in priority order and turns the result for descending columns', () => {
			const result = sortRows(ROWS, [sorted('city', 'DESC'), sorted('id', 'ASC')], false);
			expect(result.map((row) => (row as Row).id)).toEqual([1, 2, 3]);
			expect(result).not.toBe(ROWS);
		});

		it('passes the direction to the compare function', () => {
			const compareFn = jest.fn(() => 0);
			sortRows(ROWS, [sorted('id', 'DESC', compareFn)], false);
			expect(compareFn).toHaveBeenCalledWith(expect.anything(), expect.anything(), 'DESC');
		});

		it('returns a copy without sort and the rows themselves with disabled sort', () => {
			expect(sortRows(ROWS, [], false)).toEqual(ROWS);
			expect(sortRows(ROWS, [], false)).not.toBe(ROWS);
			expect(sortRows(ROWS, [sorted('id', 'ASC')], true)).toBe(ROWS);
		});
	});

	describe('selectDisplayedData', () => {
		const data = Array.from({ length: 7 }, (_, index) => ({ id: index + 1 }));

		it('returns the rows of a page and the end of the slice', () => {
			expect(selectDisplayedData(data, 3, 2)).toEqual({ rows: [{ id: 4 }, { id: 5 }, { id: 6 }], end: 6 });
			expect(selectDisplayedData(data, 3, 3)).toEqual({ rows: [{ id: 7 }], end: 7 });
		});

		it('returns all rows for a page size or page that is not positive', () => {
			expect(selectDisplayedData(data, 0, 1)).toEqual({ rows: data, end: 7 });
			expect(selectDisplayedData(data, 3, 0)).toEqual({ rows: data, end: 7 });
		});

		it('returns no rows and the end 0 for a page beyond the data', () => {
			expect(selectDisplayedData([], 3, 1)).toEqual({ rows: [], end: 0 });
		});
	});

	describe('header cell sort state and order', () => {
		it('shows the direction of a sorted column and NOS for a sortable one', () => {
			expect(getHeaderCellSortState(ID, [sorted('id', 'DESC')], false)).toBe('DESC');
			expect(getHeaderCellSortState(CITY, [sorted('id', 'DESC')], false)).toBe('NOS');
			expect(getHeaderCellSortState(NAME, [], false)).toBeUndefined();
			expect(getHeaderCellSortState(ID, [sorted('id', 'DESC')], true)).toBeUndefined();
		});

		it('numbers the sorted columns only with multi sort', () => {
			const sortData = [sorted('city', 'ASC'), sorted('id', 'DESC')];
			expect(getHeaderCellSortOrder(ID, sortData, false, true)).toBe(2);
			expect(getHeaderCellSortOrder(ID, sortData, false, false)).toBeUndefined();
			expect(getHeaderCellSortOrder(NAME, sortData, false, true)).toBeUndefined();
		});
	});

	it('finds a header cell by key in the horizontal and vertical headers', () => {
		expect(findHeaderCell({ horizontal: [[ID]], vertical: [[CITY]] }, 'city')).toBe(CITY);
		expect(findHeaderCell({ horizontal: [[ID]] }, 'name')).toBeUndefined();
	});

	describe('header cells', () => {
		it('merges the adjusted settings over the original cells and keeps their logic fields', () => {
			const merged = mergeAdjustedHeaderCells({ horizontal: [[ID, CITY]] }, [
				[
					{ key: 'city', label: 'City', width: 200, visible: false },
					{ key: 'id', label: 'Other label' },
				],
			]);
			expect(merged[0].map((cell) => cell.key)).toEqual(['city', 'id']);
			expect(merged[0][0]).toEqual({ ...CITY, width: 200, visible: false });
			expect(merged[0][1]).toEqual(ID);
		});

		it('overlays the sort state on the built header cells', () => {
			const cells = buildHeaderCells({ horizontal: [[ID, NAME]], vertical: [] }, undefined, [sorted('id', 'ASC')], false, true);
			expect(cells.horizontal?.[0].map((cell) => [cell.key, cell.sortDirection, cell.sortOrder])).toEqual([
				['id', 'ASC', 1],
				['name', undefined, undefined],
			]);
			expect(cells.vertical).toEqual([]);
		});
	});

	describe('getSelectedData', () => {
		it('returns the selected rows in sorted order by the key property', () => {
			expect(getSelectedData({ label: () => '', keyPropertyName: 'id', selectedKeys: [] }, ROWS, ['1', 2])).toEqual([ROWS[0], ROWS[2]]);
		});

		it('uses id as the default key property', () => {
			expect(getSelectedData({ label: () => '' }, ROWS, [3])).toEqual([ROWS[1]]);
		});

		it('returns null without a selection or with an empty key property', () => {
			expect(getSelectedData(undefined, ROWS, [1])).toBeNull();
			expect(getSelectedData({ label: () => '', keyPropertyName: '' }, ROWS, [1])).toBeNull();
		});
	});
});
