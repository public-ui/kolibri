import { describe, expect, it } from '@jest/globals';
import type { KoliBriTableHeaderCell } from '../../../schema';
import { createSelectionModel, getFixedOffsets, getFixedSide, getPrimaryHeaders, getSelectAllSelection, getTableMinWidth } from './table-model';

const cell = (key: string, width?: number): KoliBriTableHeaderCell => ({ key, label: key.toUpperCase(), width });

describe('getPrimaryHeaders', () => {
	it('renders row-wise when the horizontal headers carry keys', () => {
		expect(getPrimaryHeaders({ horizontal: [[cell('a')]], vertical: [[cell('b')]] })).toEqual({ cells: [cell('a')], horizontal: true });
	});

	it('renders column-wise when only the vertical headers carry keys', () => {
		expect(getPrimaryHeaders({ horizontal: [[{ label: 'Title' }]], vertical: [[cell('b')]] })).toEqual({ cells: [cell('b')], horizontal: false });
	});
});

describe('fixed columns', () => {
	it('fixes no column by default, even beyond the column count', () => {
		expect(getFixedSide([0, 0], false, 3, 3)).toBeUndefined();
	});

	it('fixes nothing while sticky columns are disabled', () => {
		expect(getFixedSide([1, 1], true, 3, 0)).toBeUndefined();
	});

	it('sums the widths towards the edge of the table', () => {
		const cells = [cell('a', 10), cell('b', 20), cell('c', 30), cell('d', 40), cell('e', 50)];
		expect(getFixedOffsets(cells, 5, [2, 3], false)).toEqual([0, 10, 90, 50, 0]);
	});
});

describe('getTableMinWidth', () => {
	it('sums the declared widths of visible header cells', () => {
		expect(getTableMinWidth({ horizontal: [[cell('a', 100), { ...cell('b', 50), visible: false }, cell('c', 20)]], vertical: [] })).toBe('calc(100px + 20px)');
	});

	it('falls back to 0px without declared widths', () => {
		expect(getTableMinWidth({ horizontal: [[cell('a')]], vertical: [] })).toBe('0px');
	});
});

describe('getSelectAllSelection', () => {
	const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
	const model = createSelectionModel({ label: () => 'row', selectedKeys: [2, 3], disabledKeys: [3] });

	it('keeps selected disabled rows when deselecting all', () => {
		expect(getSelectAllSelection(data, model, false)).toEqual([3]);
	});

	it('adds every selectable row when selecting all', () => {
		expect(getSelectAllSelection(data, model, true)).toEqual([3, 1, 2]);
	});
});
