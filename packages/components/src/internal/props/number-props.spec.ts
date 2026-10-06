import { afterAll, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Log } from '../../schema/utils/dev.utils';
import { highProp } from './high';
import { headingLevelOptions, levelProp } from './level';
import { lowProp } from './low';
import { maxProp } from './max';
import { minProp } from './min';
import { optimumProp } from './optimum';
import { selectedProp } from './selected';
import { tabIndexProp } from './tab-index';
import { numberValueProp } from './value-number';
import { clampedNumberValueProp } from './value-number-clamped';

/**
 * Pins the numeric prop definitions. `normalizeNumber` parses a whole string with `Number()`;
 * `normalizeInteger` does the same and rounds the result. Both reject `NaN`, the empty string and
 * strings with trailing characters.
 *
 * `devWarning` logs each distinct message once and the message names the prop and the value, so
 * props sharing the prop name `value` use different invalid values.
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

const toText = (message: unknown): string => (Array.isArray(message) ? message.join(' ') : String(message));
const debug = jest.spyOn(Log, 'debug').mockImplementation(() => undefined);
const warn = jest.spyOn(Log, 'warn').mockImplementation(() => undefined);
const hints = (): string[] => debug.mock.calls.map(([message]) => toText(message));
const warnings = (): string[] => warn.mock.calls.map(([message]) => toText(message));

beforeEach(() => {
	debug.mockClear();
	warn.mockClear();
});

afterAll(() => {
	debug.mockRestore();
	warn.mockRestore();
});

const UNBOUNDED_NUMBER_PROPS: ReadonlyArray<{ name: string; definition: PropDefinition }> = [
	{ name: 'highProp', definition: highProp },
	{ name: 'lowProp', definition: lowProp },
	{ name: 'minProp', definition: minProp },
	{ name: 'optimumProp', definition: optimumProp },
	{ name: 'selectedProp', definition: selectedProp },
];

describe.each(UNBOUNDED_NUMBER_PROPS)('$name', ({ definition }) => {
	it.each([undefined, null])('applies the default 0 for %p', (value) => {
		expect(applied(definition, value)).toEqual([0]);
	});

	it.each<[unknown, number]>([
		[5, 5],
		[-5, -5],
		[1.5, 1.5],
		['5', 5],
		['-1.5', -1.5],
	])('normalizes %p to %p', (value, expected) => {
		expect(applied(definition, value)).toEqual([expected]);
		expect(warnings()).toEqual([]);
	});

	it.each<unknown>(['', ' ', NaN, 'abc', true, {}])('ignores %p with a developer warning', (value) => {
		expect(applied(definition, value)).toEqual([]);
		expect(warnings()).toEqual([expect.stringContaining(`for '${definition.propName}' is not valid (Invalid number`)]);
	});
});

describe('maxProp', () => {
	it.each([undefined, null])('applies the default 100 for %p', (value) => {
		expect(applied(maxProp, value)).toEqual([100]);
	});

	it.each<[unknown, number]>([
		[50, 50],
		[0.5, 0.5],
		['50', 50],
	])('normalizes %p to %p', (value, expected) => {
		expect(applied(maxProp, value)).toEqual([expected]);
	});

	it.each<unknown>([0, -1])('ignores the non-positive value %p with a developer warning', (value) => {
		expect(applied(maxProp, value)).toEqual([]);
		expect(warnings()).toEqual([expect.stringContaining(`for 'max' is not valid. The value is ignored.`)]);
	});

	it.each<[unknown, string]>([
		['abc', 'abc'],
		['', ''],
		[NaN, 'NaN'],
	])('ignores the non-numeric value %p with a developer warning', (value, printed) => {
		expect(applied(maxProp, value)).toEqual([]);
		expect(warnings()).toEqual([expect.stringContaining(`for 'max' is not valid (Invalid number: ${printed})`)]);
	});
});

describe('numberValueProp', () => {
	it.each([undefined, null])('applies the default 0 for %p', (value) => {
		expect(applied(numberValueProp, value)).toEqual([0]);
	});

	it.each<[unknown, number]>([
		[0, 0],
		[5, 5],
		['5', 5],
	])('normalizes %p to %p', (value, expected) => {
		expect(applied(numberValueProp, value)).toEqual([expected]);
	});

	it('ignores a negative value with a developer warning', () => {
		expect(applied(numberValueProp, -1)).toEqual([]);
		expect(warnings()).toEqual([expect.stringContaining(`for 'value' is not valid. The value is ignored.`)]);
	});

	it.each<[unknown, string]>([
		['abc', 'abc'],
		['', ''],
		[NaN, 'NaN'],
	])('ignores the non-numeric value %p with a developer warning', (value, printed) => {
		expect(applied(numberValueProp, value)).toEqual([]);
		expect(warnings()).toEqual([expect.stringContaining(`for 'value' is not valid (Invalid number: ${printed})`)]);
	});
});

describe('clampedNumberValueProp', () => {
	const deps = { min: 0, max: 10 };
	const appliedWith = (value: unknown, dependencies: { min: number; max: number }): unknown[] => {
		const callback = jest.fn();
		clampedNumberValueProp.apply(value, callback, dependencies);
		return callback.mock.calls.map(([normalized]) => normalized);
	};

	it.each([undefined, null])('applies the default 0 for %p', (value) => {
		expect(appliedWith(value, deps)).toEqual([0]);
	});

	it.each<[{ min: number; max: number }, number]>([
		[{ min: 5, max: 10 }, 5],
		[{ min: -10, max: -5 }, -5],
	])('clamps the default 0 into the range %p', (dependencies, expected) => {
		expect(appliedWith(undefined, dependencies)).toEqual([expected]);
	});

	it.each<[unknown, number]>([
		[0, 0],
		[5, 5],
		[10, 10],
		['5', 5],
		[-1, 0],
		[11, 10],
		['-1', 0],
	])('normalizes %p to %p within [0, 10]', (value, expected) => {
		expect(appliedWith(value, deps)).toEqual([expected]);
	});

	it.each<[unknown, string]>([
		['xyz', 'xyz'],
		[' ', ' '],
	])('ignores the non-numeric value %p with a developer warning', (value, printed) => {
		expect(appliedWith(value, deps)).toEqual([]);
		expect(warnings()).toEqual([expect.stringContaining(`for 'value' is not valid (Invalid number: ${printed})`)]);
	});

	// `numberValueProp` already logs the identical warning for `NaN` under the prop name `value`.
	it('ignores NaN', () => {
		expect(appliedWith(NaN, deps)).toEqual([]);
	});
});

describe('levelProp', () => {
	it.each([undefined, null])('applies the default 0 for %p', (value) => {
		expect(applied(levelProp, value)).toEqual([0]);
	});

	it.each(headingLevelOptions)('accepts the heading level %p', (value) => {
		expect(applied(levelProp, value)).toEqual([value]);
	});

	it.each<[unknown, number]>([
		['3', 3],
		[2.6, 3],
		['2.6', 3],
	])('normalizes %p to %p', (value, expected) => {
		expect(applied(levelProp, value)).toEqual([expected]);
	});

	it.each<unknown>([7, -1])('ignores the out-of-range value %p with a developer warning', (value) => {
		expect(applied(levelProp, value)).toEqual([]);
		expect(warnings()).toEqual([expect.stringContaining(`for 'level' is not valid. The value is ignored.`)]);
	});

	it.each<unknown>(['abc', '4px', '', NaN])('ignores the non-numeric value %p with a developer warning', (value) => {
		expect(applied(levelProp, value)).toEqual([]);
		expect(warnings()).toEqual([expect.stringContaining(`for 'level' is not valid (Invalid integer: ${String(value)})`)]);
	});
});

describe('tabIndexProp', () => {
	it.each([undefined, null])('applies the default 0 for %p', (value) => {
		expect(applied(tabIndexProp, value)).toEqual([0]);
	});

	it.each<[unknown, number]>([
		[-1, -1],
		[0, 0],
		['-1', -1],
	])('normalizes %p to %p without a hint', (value, expected) => {
		expect(applied(tabIndexProp, value)).toEqual([expected]);
		expect(hints()).toEqual([]);
	});

	it.each<[unknown, number]>([
		['3', 3],
		[1.5, 2],
	])('emits the a11y hint for %p with the normalized positive value %p', (value, expected) => {
		expect(applied(tabIndexProp, value)).toEqual([expected]);
		expect(hints()).toEqual([expect.stringContaining(`Positive tabIndex values ("${expected}") can disrupt the natural tab order.`)]);
	});

	it.each<unknown>(['abc', NaN])('ignores the non-numeric value %p with a developer warning and without a hint', (value) => {
		expect(applied(tabIndexProp, value)).toEqual([]);
		expect(warnings()).toEqual([expect.stringContaining(`for 'tabIndex' is not valid (Invalid integer: ${String(value)})`)]);
		expect(hints()).toEqual([]);
	});
});
