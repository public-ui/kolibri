import { describe, expect, it, jest } from '@jest/globals';
import { hasClearButtonProp } from './has-clear-button';

/**
 * Pins the props of `kol-combobox` and `kol-single-select` against the legacy validators they replace
 * (G5.3 of `docs/FORM_FIELD_SKELETON_MIGRATION_PLAN.md`).
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
