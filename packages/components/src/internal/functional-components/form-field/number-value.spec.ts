import { describe, expect, it } from '@jest/globals';
import type { NumberValueType } from './number-value';
import { clampRangeValue, getNumberValueType, parseInputNumberValue, remapNumberValue } from './number-value';

/**
 * Pins the value handling of the legacy `kol-input-number` and `kol-input-range` (G3a.1 of
 * `docs/FORM_FIELD_SKELETON_MIGRATION_PLAN.md`), including the quirks the migration keeps.
 */
describe('getNumberValueType', () => {
	it.each([
		['5', 'NumberString'],
		['0.5', 'NumberString'],
		[5, 'number'],
		[0, 'number'],
		[-5, 'number'],
		[NaN, 'null'],
		[null, 'null'],
		[undefined, 'null'],
		['-5', 'null'],
	])('classifies %p as %p', (value, type) => {
		expect(getNumberValueType(value)).toBe(type);
	});
});

const REMAP_CASES: Array<[number | null | undefined, NumberValueType, number | string | null]> = [
	[5, 'NumberString', '5'],
	[5, 'number', 5],
	[5, 'null', 5],
	[null, 'NumberString', null],
	[undefined, 'number', null],
	[NaN, 'number', NaN],
];

describe('remapNumberValue', () => {
	it.each(REMAP_CASES)('returns %p with type %p as %p', (value, type, remapped) => {
		expect(remapNumberValue(value, type)).toBe(remapped);
	});
});

describe('parseInputNumberValue', () => {
	it.each([
		['', null],
		['0', 0],
		['10.23', 10.23],
		['-5', -5],
	])('parses %p as %p', (raw, value) => {
		expect(parseInputNumberValue(raw)).toBe(value);
	});
});

describe('clampRangeValue', () => {
	it.each([
		['5', 1, 10, 5],
		['20', 1, 10, 10],
		['-3', 1, 10, 1],
		['-3', 0, 100, -3],
		['5', -10, 0, 5],
		['', 0, 100, NaN],
		['7.5', null, null, 7.5],
	])('clamps %p to [%p, %p] as %p', (raw, min, max, value) => {
		expect(clampRangeValue(raw, min, max)).toBe(value);
	});
});
