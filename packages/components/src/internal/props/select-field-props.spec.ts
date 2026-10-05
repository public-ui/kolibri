import { describe, expect, it, jest } from '@jest/globals';
import { optionsWithOptgroupProp } from './options-with-optgroup';
import { selectValueProp } from './select-value';

/**
 * Pins the props of `kol-select` against the legacy validators `validateOptionsWithOptgroup` and the
 * value handling of the select controller they replace (G5.1 of
 * `docs/FORM_FIELD_SKELETON_MIGRATION_PLAN.md`).
 */
type PropDefinition = {
	apply: (value: unknown, callback: (normalized: unknown) => void) => void;
};

const applied = (definition: PropDefinition, value: unknown): unknown[] => {
	const callback = jest.fn();
	definition.apply(value, callback);
	return callback.mock.calls.map(([normalized]) => normalized);
};

describe('optionsWithOptgroupProp', () => {
	it.each([undefined, null])('applies the default [] for %s', (value) => {
		expect(applied(optionsWithOptgroupProp, value)).toEqual([[]]);
	});

	it('accepts options and optgroups and normalizes them in place', () => {
		const options = [
			{ label: ' Eins ', value: 1 },
			{ label: 'Gruppe', options: [{ label: 'Zwei', value: 2, disabled: true }] },
			{ label: 3, value: 3 },
		];
		expect(applied(optionsWithOptgroupProp, options)).toEqual([
			[
				{ label: 'Eins', value: 1, disabled: false },
				{ label: 'Gruppe', disabled: false, options: [{ label: 'Zwei', value: 2, disabled: true }] },
				{ label: 3, value: 3 },
			],
		]);
		expect(options[0]).toEqual({ label: 'Eins', value: 1, disabled: false });
	});

	it('parses a JSON string', () => {
		expect(applied(optionsWithOptgroupProp, '[{"label":"Eins","value":1}]')).toEqual([[{ label: 'Eins', value: 1, disabled: false }]]);
	});

	it.each([
		['an option without label', [{ value: 1 }]],
		['an option with an empty label', [{ label: '', value: 1 }]],
		['an invalid option in an optgroup', [{ label: 'Gruppe', options: [{ value: 1 }] }]],
		['an empty string', ''],
		['[object Object]', '[object Object]'],
		['an object', { label: 'Eins' }],
	])('ignores %s', (_name, value) => {
		expect(applied(optionsWithOptgroupProp, value)).toEqual([]);
	});
});

describe('selectValueProp', () => {
	it.each([undefined, null])('applies the default [] for %s', (value) => {
		expect(applied(selectValueProp, value)).toEqual([[]]);
	});

	it.each([
		['a list', ['a', 'b'], ['a', 'b']],
		['a single value', 'a', ['a']],
		['a JSON string as a value of its own', '["a"]', ['["a"]']],
		['false', false, [false]],
	])('accepts %s', (_name, value, expected) => {
		expect(applied(selectValueProp, value)).toEqual([expected]);
	});
});
