import { describe, expect, it, jest } from '@jest/globals';
import { hasClearButtonProp } from './has-clear-button';
import { singleSelectOptionsProp } from './single-select-options';

/**
 * Pins the props of `kol-combobox` and `kol-single-select` against the legacy validators they replace
 * (G5.3 and G5.4 of `docs/FORM_FIELD_SKELETON_MIGRATION_PLAN.md`).
 */
type PropDefinition = {
	apply: (value: unknown, callback: (normalized: unknown) => void) => void;
};

const applied = (definition: PropDefinition, value: unknown): unknown[] => {
	const callback = jest.fn();
	definition.apply(value, callback);
	return callback.mock.calls.map(([normalized]) => normalized);
};

describe('hasClearButtonProp', () => {
	it.each([undefined, null])('applies the default true for %s', (value) => {
		expect(applied(hasClearButtonProp, value)).toEqual([true]);
	});

	it.each([true, false])('accepts %s', (value) => {
		expect(applied(hasClearButtonProp, value)).toEqual([value]);
	});

	it.each([1, {}])('ignores %s', (value) => {
		expect(applied(hasClearButtonProp, value)).toEqual([]);
	});
});

describe('singleSelectOptionsProp', () => {
	const options = [
		{ label: 'A', value: 'a' },
		{ label: 'B', value: false, disabled: true },
	];

	it.each([undefined, null])('applies the default [] for %s', (value) => {
		expect(applied(singleSelectOptionsProp, value)).toEqual([[]]);
	});

	it('accepts an array of options', () => {
		expect(applied(singleSelectOptionsProp, options)).toEqual([options]);
	});

	it('parses a JSON string', () => {
		expect(applied(singleSelectOptionsProp, JSON.stringify(options))).toEqual([options]);
	});

	it.each([[[{ label: '' }]], [[{ label: 1 }]], [[{ value: 'a' }]], [[options[0], 'a']], [{}], ['{']])('ignores %j', (value) => {
		expect(applied(singleSelectOptionsProp, value)).toEqual([]);
	});
});
