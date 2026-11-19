import { describe, expect, it, jest } from '@jest/globals';
import { adjustHeightProp } from './adjust-height';
import { hasCounterProp } from './has-counter';
import { inputTextTypeProp } from './input-text-type';
import { maxLengthProp } from './max-length';
import { maxLengthBehaviorProp } from './max-length-behavior';
import { multipleProp } from './multiple';
import { patternProp } from './pattern';
import { placeholderProp } from './placeholder';
import { resizeProp } from './resize';
import { rowsProp } from './rows';
import { spellCheckProp } from './spell-check';
import { visibilityToggleProp } from './visibility-toggle';

/**
 * Pins the props of the text fields against the legacy validators in `schema/props/*` they replace
 * (G2.1 of `docs/FORM_FIELD_SKELETON_MIGRATION_PLAN.md`): same defaults, same accepted values.
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

const PROPS: ReadonlyArray<{ name: string; definition: PropDefinition; unset: unknown; valid: unknown; normalized: unknown; invalid: unknown }> = [
	{ name: 'adjustHeightProp', definition: adjustHeightProp, unset: false, valid: true, normalized: true, invalid: {} },
	{ name: 'hasCounterProp', definition: hasCounterProp, unset: false, valid: true, normalized: true, invalid: {} },
	{ name: 'inputTextTypeProp', definition: inputTextTypeProp, unset: 'text', valid: 'search', normalized: 'search', invalid: 'email' },
	{ name: 'maxLengthProp', definition: maxLengthProp, unset: undefined, valid: '10', normalized: 10, invalid: -1 },
	{ name: 'maxLengthBehaviorProp', definition: maxLengthBehaviorProp, unset: 'hard', valid: 'soft', normalized: 'soft', invalid: 'strict' },
	{ name: 'multipleProp', definition: multipleProp, unset: false, valid: true, normalized: true, invalid: {} },
	{ name: 'patternProp', definition: patternProp, unset: undefined, valid: '[a-z]+', normalized: '[a-z]+', invalid: {} },
	{ name: 'placeholderProp', definition: placeholderProp, unset: undefined, valid: 'Name', normalized: 'Name', invalid: {} },
	{ name: 'resizeProp', definition: resizeProp, unset: 'vertical', valid: 'none', normalized: 'none', invalid: 'both' },
	{ name: 'rowsProp', definition: rowsProp, unset: undefined, valid: 5, normalized: 5, invalid: 0 },
	{ name: 'spellCheckProp', definition: spellCheckProp, unset: undefined, valid: true, normalized: true, invalid: {} },
	{ name: 'visibilityToggleProp', definition: visibilityToggleProp, unset: false, valid: true, normalized: true, invalid: {} },
];

describe.each(PROPS)('$name', ({ definition, unset, valid, normalized, invalid }) => {
	it.each([undefined, null])('applies the default for %s', (value) => {
		expect(applied(definition, value)).toEqual([unset]);
	});

	it('normalizes a valid value', () => {
		expect(applied(definition, valid)).toEqual([normalized]);
	});

	it('ignores an invalid value', () => {
		expect(applied(definition, invalid)).toEqual([]);
	});
});

describe('maxLengthProp', () => {
	it('accepts 0', () => {
		expect(applied(maxLengthProp, 0)).toEqual([0]);
	});
});
