import { describe, expect, it, jest } from '@jest/globals';
import { radioOptionsProp } from './radio-options';
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

	it.each([
		['an option without label', [{ value: 'a' }]],
		['an option with an empty label', [{ label: '', value: 'a' }]],
		['an option with a number label', [{ label: 'A' }, { label: 1, value: 1 }]],
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
