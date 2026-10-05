import { describe, expect, it, jest } from '@jest/globals';
import { fixedColsProp } from './fixed-cols';
import { tableDataProp } from './table-data';
import { tableHeadersProp } from './table-headers';
import { tableSelectionProp } from './table-selection';

/**
 * Pins the normalization of the table props: the values the stateless table accepts from HTML
 * attributes (JSON strings) and the neutral defaults it renders when a prop is unset.
 */
const applied = <T>(definition: { apply: (value: unknown, callback: (normalized: T) => void) => void }, value: unknown): T | undefined => {
	let result: T | undefined;
	definition.apply(value, (normalized) => {
		result = normalized;
	});
	return result;
};

describe('tableDataProp', () => {
	it('parses single-quoted JSON from an HTML attribute', () => {
		expect(applied(tableDataProp, "[{'id': 1}]")).toEqual([{ id: 1 }]);
	});

	it('ignores a list with a non-object row', () => {
		const callback = jest.fn();
		tableDataProp.apply([{ id: 1 }, 'row'], callback);
		expect(callback).not.toHaveBeenCalled();
	});
});

describe('tableHeadersProp', () => {
	it('normalizes an omitted direction to an empty list', () => {
		expect(applied(tableHeadersProp, { horizontal: [[{ key: 'a', label: 'A' }]] })).toEqual({ horizontal: [[{ key: 'a', label: 'A' }]], vertical: [] });
	});

	it('ignores headers with a non-numeric width', () => {
		const callback = jest.fn();
		tableHeadersProp.apply({ horizontal: [[{ key: 'a', label: 'A', width: '10px' }]] }, callback);
		expect(callback).not.toHaveBeenCalled();
	});
});

describe('tableSelectionProp', () => {
	it('defaults to "no selection"', () => {
		expect(applied(tableSelectionProp, undefined)).toBe(false);
	});

	it('requires a label function', () => {
		const callback = jest.fn();
		tableSelectionProp.apply({ selectedKeys: [] }, callback);
		expect(callback).not.toHaveBeenCalled();
	});
});

describe('fixedColsProp', () => {
	it('accepts two non-negative integers', () => {
		expect(applied(fixedColsProp, [2, 1])).toEqual([2, 1]);
	});

	it('ignores negative counts', () => {
		const callback = jest.fn();
		fixedColsProp.apply([-1, 0], callback);
		expect(callback).not.toHaveBeenCalled();
	});
});
