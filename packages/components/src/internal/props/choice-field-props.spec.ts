import { describe, expect, it, jest } from '@jest/globals';
import { radioOptionsProp } from './radio-options';
import { radioOrientationProp } from './radio-orientation';
import { radioValueProp } from './radio-value';

/**
 * Pins the props of `kol-input-radio`: the options, the orientation and the value handling.
 */
type PropDefinition = {
	apply: (value: unknown, callback: (normalized: unknown) => void) => void;
};

const applied = (definition: PropDefinition, value: unknown): unknown[] => {
	const callback = jest.fn();
	definition.apply(value, callback);
	return callback.mock.calls.map(([normalized]) => normalized);
};

const OPTIONS = [
	{ label: 'A', value: 'a' },
	{ label: 'B', value: { id: 2 } },
];

describe('radioOptionsProp', () => {
	it.each([undefined, null])('applies the default [] for %s', (value) => {
		expect(applied(radioOptionsProp, value)).toEqual([[]]);
	});

	it('accepts an array of options', () => {
		expect(applied(radioOptionsProp, OPTIONS)).toEqual([OPTIONS]);
	});

	it('parses a JSON string', () => {
		expect(applied(radioOptionsProp, JSON.stringify(OPTIONS))).toEqual([OPTIONS]);
	});

	it('converts a number label to a string', () => {
		expect(applied(radioOptionsProp, [{ label: 'A' }, { label: 1, value: 1 }])).toEqual([[{ label: 'A' }, { label: '1', value: 1 }]]);
	});

	it.each([
		['an option without label', [{ value: 'a' }]],
		['an option with a NaN label', [{ label: NaN, value: 'a' }]],
		['a list with a non-object entry', [{ label: 'A' }, 'a']],
		['an unparsable JSON string', '{'],
		['an option with an empty label', [{ label: '', value: 'a' }]],
		['an empty string', ''],
		['an object', { label: 'A' }],
		['an unparsable string', 'abc'],
	])('ignores %s', (_name, value) => {
		expect(applied(radioOptionsProp, value)).toEqual([]);
	});
});

describe('radioOrientationProp', () => {
	it.each([undefined, null])('applies the default vertical for %s', (value) => {
		expect(applied(radioOrientationProp, value)).toEqual(['vertical']);
	});

	it.each(['horizontal', 'vertical'])('accepts %s', (value) => {
		expect(applied(radioOrientationProp, value)).toEqual([value]);
	});

	it('ignores an invalid orientation', () => {
		expect(applied(radioOrientationProp, 'diagonal')).toEqual([]);
	});
});

describe('radioValueProp', () => {
	it.each([undefined, null])('applies the default null for %s', (value) => {
		expect(applied(radioValueProp, value)).toEqual([null]);
	});

	it.each([
		['a string', 'a'],
		['a number', 0],
		['false', false],
		['an object', { id: 1 }],
	])('accepts %s', (_name, value) => {
		expect(applied(radioValueProp, value)).toEqual([value]);
	});

	it('reduces an array to its first entry', () => {
		expect(applied(radioValueProp, ['a', 'b'])).toEqual(['a']);
	});
});
