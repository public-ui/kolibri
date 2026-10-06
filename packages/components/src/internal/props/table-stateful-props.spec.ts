import { afterAll, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Log } from '../../schema/utils/dev.utils';
import { allowMultiSortProp } from './allow-multi-sort';
import { paginationPositionProp } from './pagination-position';
import { isTablePaginationShown, tablePaginationProp } from './table-pagination';
import { tableStatefulCallbacksProp } from './table-stateful-callbacks';
import { tableStatefulHeadersProp } from './table-stateful-headers';

/**
 * Pins the props of `kol-table-stateful` against the legacy validators they replace (#9599).
 */
type PropDefinition = {
	apply: (value: unknown, callback: (normalized: unknown) => void) => void;
};

const applied = (definition: PropDefinition, value: unknown): unknown[] => {
	const callback = jest.fn();
	definition.apply(value, callback);
	return callback.mock.calls.map(([normalized]) => normalized);
};

describe('allowMultiSortProp', () => {
	it.each([
		[true, true],
		[false, false],
		[undefined, false],
		[null, false],
	])('applies %j as %j', (value, expected) => {
		expect(applied(allowMultiSortProp, value)).toEqual([expected]);
	});
});

describe('paginationPositionProp', () => {
	it.each(['both', 'bottom', 'top'])('accepts %s', (value) => {
		expect(applied(paginationPositionProp, value)).toEqual([value]);
	});

	it.each([undefined, null])('applies the default bottom for %s', (value) => {
		expect(applied(paginationPositionProp, value)).toEqual(['bottom']);
	});

	it.each(['left', 1])('ignores %j', (value) => {
		expect(applied(paginationPositionProp, value)).toEqual([]);
	});
});

describe('tablePaginationProp', () => {
	it.each([true, '', 'true'])('stores %j as the default settings of a shown pagination', (value) => {
		expect(applied(tablePaginationProp, value)).toEqual([{}]);
	});

	it('stores an object as it is', () => {
		const pagination = { _page: 2, _pageSize: 5 };
		expect(applied(tablePaginationProp, pagination)).toEqual([pagination]);
	});

	it('parses a JSON string', () => {
		expect(applied(tablePaginationProp, '{"_page":3}')).toEqual([{ _page: 3 }]);
	});

	it.each([undefined, null])('applies the default settings for %s', (value) => {
		expect(applied(tablePaginationProp, value)).toEqual([{ _page: 1, _pageSize: 10, _max: 0 }]);
	});

	it.each([false, 'false', 'no json', 3])('ignores %j and keeps the stored settings', (value) => {
		expect(applied(tablePaginationProp, value)).toEqual([]);
	});

	it.each([
		[true, true],
		['', true],
		[{}, true],
		['{"_page":3}', true],
		[false, false],
		['false', false],
		[undefined, false],
		[null, false],
		['no json', false],
	])('isTablePaginationShown(%j) is %j', (value, expected) => {
		expect(isTablePaginationShown(value)).toBe(expected);
	});
});

describe('tableStatefulCallbacksProp', () => {
	it('stores the callbacks object', () => {
		const callbacks = { onSelectionChange: () => undefined };
		expect(applied(tableStatefulCallbacksProp, callbacks)).toEqual([callbacks]);
	});

	it.each([undefined, null])('applies an empty object for %s', (value) => {
		expect(applied(tableStatefulCallbacksProp, value)).toEqual([{}]);
	});
});

describe('tableStatefulHeadersProp', () => {
	const warn = jest.spyOn(Log, 'warn').mockImplementation(() => undefined);
	jest.spyOn(Log, 'error').mockImplementation(() => undefined);

	beforeEach(() => {
		warn.mockClear();
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	it('is the `headers` prop', () => {
		expect(tableStatefulHeadersProp.propName).toBe('headers');
	});

	it.each([undefined, null])('applies empty horizontal and vertical headers for %s', (value) => {
		expect(applied(tableStatefulHeadersProp, value)).toEqual([{ horizontal: [], vertical: [] }]);
	});

	it('stores an object as it is, without checking its cells', () => {
		const headers = { horizontal: [[{ key: 'a', label: 'A' }]] };
		const [normalized] = applied(tableStatefulHeadersProp, headers);
		expect(normalized).toBe(headers);
	});

	it('parses a JSON string', () => {
		expect(applied(tableStatefulHeadersProp, '{"vertical":[[{"label":"V"}]]}')).toEqual([{ vertical: [[{ label: 'V' }]] }]);
	});

	it.each<unknown>([1, true, 'not json', 'null'])('ignores %p with a warning', (value) => {
		expect(applied(tableStatefulHeadersProp, value)).toEqual([]);
		expect(warn).toHaveBeenCalled();
	});
});
