import { describe, expect, it, jest } from '@jest/globals';
import { checkboxValueProp } from './checkbox-value';
import { checkedProp } from './checked';
import { iconsInputCheckboxProp } from './icons-input-checkbox';
import { indeterminateProp } from './indeterminate';
import { labelAlignProp } from './label-align';
import { variantInputCheckboxProp } from './variant-input-checkbox';

/**
 * Pins the props of `kol-input-checkbox` against the legacy validators they replace
 * (`validateChecked`, `validateIndeterminate`, `validateLabelAlign`, `validateVariantInputCheckbox`,
 * the icon validator of the checkbox controller and the unchecked `_value`), G4.3 of
 * `docs/FORM_FIELD_SKELETON_MIGRATION_PLAN.md`.
 */
type PropDefinition = {
	apply: (value: unknown, callback: (normalized: unknown) => void) => void;
};

const applied = (definition: PropDefinition, value: unknown): unknown[] => {
	const callback = jest.fn();
	definition.apply(value, callback);
	return callback.mock.calls.map(([normalized]) => normalized);
};

describe.each([
	['checkedProp', checkedProp],
	['indeterminateProp', indeterminateProp],
])('%s', (_name, definition) => {
	it.each([undefined, null])('applies the default false for %s', (value) => {
		expect(applied(definition, value)).toEqual([false]);
	});

	it.each([true, false])('accepts %s', (value) => {
		expect(applied(definition, value)).toEqual([value]);
	});

	it.each([1, {}])('ignores %s', (value) => {
		expect(applied(definition, value)).toEqual([]);
	});
});

describe('labelAlignProp', () => {
	it.each([undefined, null])('applies the default right for %s', (value) => {
		expect(applied(labelAlignProp, value)).toEqual(['right']);
	});

	it.each(['left', 'right'])('accepts %s', (value) => {
		expect(applied(labelAlignProp, value)).toEqual([value]);
	});

	it.each(['center', 1])('ignores %s', (value) => {
		expect(applied(labelAlignProp, value)).toEqual([]);
	});
});

describe('variantInputCheckboxProp', () => {
	it.each([undefined, null])('applies the default default for %s', (value) => {
		expect(applied(variantInputCheckboxProp, value)).toEqual(['default']);
	});

	it.each(['button', 'default', 'switch'])('accepts %s', (value) => {
		expect(applied(variantInputCheckboxProp, value)).toEqual([value]);
	});

	it.each(['primary', 1])('ignores %s', (value) => {
		expect(applied(variantInputCheckboxProp, value)).toEqual([]);
	});
});

describe('iconsInputCheckboxProp', () => {
	it.each([undefined, null])('applies the default icons for %s', (value) => {
		expect(applied(iconsInputCheckboxProp, value)).toEqual([{ checked: 'kolicon-check', indeterminate: 'kolicon-minus', unchecked: 'kolicon-cross' }]);
	});

	it.each([{ checked: 'a' }, { indeterminate: 'b' }, { unchecked: 'c' }, { checked: 'a', indeterminate: 'b', unchecked: 'c' }])(
		'accepts %j as given, the field merges it',
		(value) => {
			expect(applied(iconsInputCheckboxProp, value)).toEqual([value]);
		},
	);

	it.each([
		['a JSON string', '{"checked":"a"}'],
		['an icon class string', 'kolicon-check'],
		['an object without icon class', { checked: '' }],
		['an object with other keys', { left: 'a' }],
	])('ignores %s', (_name, value) => {
		expect(applied(iconsInputCheckboxProp, value)).toEqual([]);
	});
});

describe('checkboxValueProp', () => {
	it.each([undefined, null])('applies the default true for %s', (value) => {
		expect(applied(checkboxValueProp, value)).toEqual([true]);
	});

	it.each([
		['a string', 'on'],
		['a number', 0],
		['false', false],
		['an object', { id: 1 }],
	])('accepts %s', (_name, value) => {
		expect(applied(checkboxValueProp, value)).toEqual([value]);
	});
});
