import { describe, expect, it, jest } from '@jest/globals';
import { ariaDetailsProp } from './aria-details';
import { autoCompleteProp } from './auto-complete';
import { hideMsgProp } from './hide-msg';
import { hintProp } from './hint';
import { horizontalIconsProp } from './horizontal-icons';
import { infoPopoverProp } from './info-popover';
import { inputCallbacksProp } from './input-callbacks';
import { msgProp } from './msg';
import { readOnlyProp } from './read-only';
import { requiredProp } from './required';
import { suggestionsProp } from './suggestions';
import { syncValueBySelectorProp } from './sync-value-by-selector';
import { touchedProp } from './touched';
import { stringValueProp } from './value-string';

/**
 * Pins the shared form field props against the legacy validators in `schema/props/*` they replace
 * (G1.1 of `docs/FORM_FIELD_SKELETON_MIGRATION_PLAN.md`): same defaults, same accepted values.
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
	{ name: 'ariaDetailsProp', definition: ariaDetailsProp, unset: '', valid: 'details', normalized: 'details', invalid: {} },
	{ name: 'autoCompleteProp', definition: autoCompleteProp, unset: 'off', valid: 'email', normalized: 'email', invalid: '' },
	{ name: 'hideMsgProp', definition: hideMsgProp, unset: false, valid: true, normalized: true, invalid: {} },
	{ name: 'hintProp', definition: hintProp, unset: '', valid: 'Hint', normalized: 'Hint', invalid: {} },
	{ name: 'infoPopoverProp', definition: infoPopoverProp, unset: undefined, valid: { _label: 'Info' }, normalized: { _label: 'Info' }, invalid: 'Info' },
	{
		name: 'msgProp',
		definition: msgProp,
		unset: undefined,
		valid: { _description: 'Error' },
		normalized: { _description: 'Error' },
		invalid: { _type: 'error' },
	},
	{ name: 'readOnlyProp', definition: readOnlyProp, unset: false, valid: true, normalized: true, invalid: {} },
	{ name: 'requiredProp', definition: requiredProp, unset: false, valid: true, normalized: true, invalid: {} },
	{ name: 'suggestionsProp', definition: suggestionsProp, unset: [], valid: ['a', 1], normalized: ['a', 1], invalid: [{}] },
	{ name: 'syncValueBySelectorProp', definition: syncValueBySelectorProp, unset: undefined, valid: '#target', normalized: '#target', invalid: {} },
	{ name: 'touchedProp', definition: touchedProp, unset: false, valid: true, normalized: true, invalid: {} },
	{ name: 'stringValueProp', definition: stringValueProp, unset: undefined, valid: '#cc006e', normalized: '#cc006e', invalid: {} },
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

describe('msgProp', () => {
	it('parses a JSON string', () => {
		expect(applied(msgProp, '{"_type":"info","_description":"Info"}')).toEqual([{ _type: 'info', _description: 'Info' }]);
	});

	it('keeps a plain string, which renders as an error message', () => {
		expect(applied(msgProp, 'Error')).toEqual(['Error']);
	});

	it('ignores an empty string', () => {
		expect(applied(msgProp, '')).toEqual([]);
	});
});

describe('suggestionsProp', () => {
	it('parses a JSON string', () => {
		expect(applied(suggestionsProp, '["#ff0000","#00ff00"]')).toEqual([['#ff0000', '#00ff00']]);
	});
});

describe('horizontalIconsProp', () => {
	it('places a single icon class on the left', () => {
		expect(applied(horizontalIconsProp, 'codicon codicon-home')).toEqual([{ left: { icon: 'codicon codicon-home' } }]);
	});

	it('maps an icon object per position', () => {
		expect(applied(horizontalIconsProp, { left: 'codicon codicon-home', right: { icon: 'codicon codicon-close', label: 'Close' } })).toEqual([
			{ left: { icon: 'codicon codicon-home' }, right: { icon: 'codicon codicon-close', label: 'Close' } },
		]);
	});

	it('parses a JSON string', () => {
		expect(applied(horizontalIconsProp, '{"right":"codicon codicon-close"}')).toEqual([{ right: { icon: 'codicon codicon-close' } }]);
	});

	it('accepts an empty object', () => {
		expect(applied(horizontalIconsProp, {})).toEqual([{}]);
	});

	it('applies the empty default when unset', () => {
		expect(applied(horizontalIconsProp, undefined)).toEqual([{}]);
	});

	it('ignores an object without any icon position', () => {
		expect(applied(horizontalIconsProp, { center: 'codicon codicon-home' })).toEqual([]);
	});
});

describe('inputCallbacksProp', () => {
	it('keeps the callbacks object', () => {
		const onInput = () => undefined;
		expect(applied(inputCallbacksProp, { onInput })).toEqual([{ onInput }]);
	});
});
