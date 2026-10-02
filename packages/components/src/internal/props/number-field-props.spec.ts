import { describe, expect, it, jest } from '@jest/globals';
import { inputMaxProp } from './input-max';
import { inputMinProp } from './input-min';
import { stepProp } from './step';
import { inputNumberValueProp } from './value-input-number';

/**
 * Pins the numeric props of `kol-input-number` and `kol-input-range`: the accepted values and the
 * parsed result.
 */
type PropDefinition = {
	readonly propName: string;
	apply: (value: unknown, callback: (normalized: unknown) => void) => void;
};

const applied = (definition: PropDefinition, value: unknown): unknown[] => {
	const callback = jest.fn();
	definition.apply(value, callback);
	return callback.mock.calls.map(([normalized]) => normalized);
};

describe.each([
	{ name: 'inputMaxProp', definition: inputMaxProp },
	{ name: 'inputMinProp', definition: inputMinProp },
	{ name: 'inputNumberValueProp', definition: inputNumberValueProp },
	{ name: 'stepProp', definition: stepProp },
])('$name', ({ definition }) => {
	it.each([undefined, null])('applies the default undefined for %s', (value) => {
		expect(applied(definition, value)).toEqual([undefined]);
	});

	it.each([
		[0, 0],
		[1.5, 1.5],
		[-5, -5],
		['5', 5],
		['0.25', 0.25],
	])('accepts %p as %p', (value, normalized) => {
		expect(applied(definition, value)).toEqual([normalized]);
	});

	it('clears the value for NaN', () => {
		expect(applied(definition, NaN)).toEqual([undefined]);
	});

	it.each(['-5', '1e3', '.5', '', 'abc', {}, true])('ignores %p', (value) => {
		expect(applied(definition, value)).toEqual([]);
	});
});
