import { describe, expect, it, jest } from '@jest/globals';
import { boundaryCountProp } from './boundary-count';
import { normalizeNumberType } from './helpers/normalizers';
import { pageProp } from './page';
import { pageSizeProp } from './page-size';
import { pageSizeOptionsProp } from './page-size-options';
import { paginationHasButtonsProp } from './pagination-has-buttons';
import { paginationLabelProp } from './pagination-label';
import { paginationMaxProp } from './pagination-max';
import { siblingCountProp } from './sibling-count';

/**
 * Pins the props of `kol-pagination` against the legacy validators they replace (#9590).
 */
type PropDefinition = {
	apply: (value: unknown, callback: (normalized: unknown) => void) => void;
};

const applied = (definition: PropDefinition, value: unknown): unknown[] => {
	const callback = jest.fn();
	definition.apply(value, callback);
	return callback.mock.calls.map(([normalized]) => normalized);
};

describe('normalizeNumberType', () => {
	it.each([0, -1, 2.5, NaN])('accepts the number %s', (value) => {
		expect(normalizeNumberType(value)).toBe(value);
	});

	it.each(['5', null, undefined, {}])('rejects %j', (value) => {
		expect(() => normalizeNumberType(value)).toThrow();
	});
});

describe.each([
	['boundaryCountProp', boundaryCountProp],
	['siblingCountProp', siblingCountProp],
])('%s', (_name, definition) => {
	it.each([undefined, null])('applies the default 1 for %s', (value) => {
		expect(applied(definition, value)).toEqual([1]);
	});

	it.each([
		[3, 3],
		[0, 0],
		[-2, 0],
	])('maps %s to %s', (value, expected) => {
		expect(applied(definition, value)).toEqual([expected]);
	});

	it('keeps NaN like the legacy validator', () => {
		expect(applied(definition, NaN)).toEqual([NaN]);
	});
});

describe.each([
	['pageProp', pageProp, 0],
	['pageSizeProp', pageSizeProp, 1],
	['paginationMaxProp', paginationMaxProp, 0],
])('%s', (_name, definition, defaultValue) => {
	it('applies its default without a value', () => {
		expect(applied(definition, undefined)).toEqual([defaultValue]);
	});

	it.each([7, 0, -3])('accepts %s', (value) => {
		expect(applied(definition, value)).toEqual([value]);
	});

	it.each(['7', {}])('ignores %j', (value) => {
		expect(applied(definition, value)).toEqual([]);
	});
});

describe('pageSizeOptionsProp', () => {
	const options = [
		{ label: '10', value: 10 },
		{ label: '20', value: 20 },
	];

	it('applies the default [] for undefined', () => {
		expect(applied(pageSizeOptionsProp, undefined)).toEqual([[]]);
	});

	it.each([[[10, 20]], ['[10, 20]']])('maps %j to options', (value) => {
		expect(applied(pageSizeOptionsProp, value)).toEqual([options]);
	});

	it.each([[[10, '20']], [''], ['[object Object]'], [{}], ['{']])('ignores %j', (value) => {
		expect(applied(pageSizeOptionsProp, value)).toEqual([]);
	});
});

describe('paginationHasButtonsProp', () => {
	it.each([true, false])('sets all buttons for %s', (value) => {
		expect(applied(paginationHasButtonsProp, value)).toEqual([{ first: value, last: value, next: value, previous: value }]);
	});

	it('keeps only the boolean buttons of an object', () => {
		expect(applied(paginationHasButtonsProp, { first: false, next: 'yes' })).toEqual([{ first: false }]);
	});

	it('parses a JSON string', () => {
		expect(applied(paginationHasButtonsProp, '{"last":false}')).toEqual([{ last: false }]);
	});

	it('hides all buttons for a JSON string that is no object', () => {
		expect(applied(paginationHasButtonsProp, '5')).toEqual([{ first: false, last: false, next: false, previous: false }]);
	});

	it.each([5, '{'])('ignores %j', (value) => {
		expect(applied(paginationHasButtonsProp, value)).toEqual([]);
	});
});

describe('paginationLabelProp', () => {
	it.each(['', 'P', 'A very long navigation label that is longer than eighty characters, which labelProp rejects'])('accepts %j', (value) => {
		expect(applied(paginationLabelProp, value)).toEqual([value]);
	});
});
