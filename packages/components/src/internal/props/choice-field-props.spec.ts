import { describe, expect, it, jest } from '@jest/globals';
import { optionsProp } from './options';
import { radioOrientationProp } from './radio-orientation';
import { radioValueProp } from './radio-value';

/**
 * Pins the props of `kol-input-radio` against the legacy validators `validateOptions` and
 * `validateOrientation` and the value handling of the radio controller they replace (G4.1 and G4.4
 * of `docs/FORM_FIELD_SKELETON_MIGRATION_PLAN.md`).
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

describe('optionsProp', () => {
	it.each([undefined, null])('applies the default [] for %s', (value) => {
		expect(applied(optionsProp, value)).toEqual([[]]);
	});

	it('accepts an array of options', () => {
		expect(applied(optionsProp, OPTIONS)).toEqual([OPTIONS]);
	});

	it('parses a JSON string', () => {
		expect(applied(optionsProp, JSON.stringify(OPTIONS))).toEqual([OPTIONS]);
	});

	it('converts a number label to a string', () => {
		expect(applied(optionsProp, [{ label: 'A' }, { label: 1, value: 1 }])).toEqual([[{ label: 'A' }, { label: '1', value: 1 }]]);
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
		expect(applied(optionsProp, value)).toEqual([]);
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
