import { describe, expect, it } from '@jest/globals';

import { clampRangeValue, parseInputNumberValue } from './number-value';

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
