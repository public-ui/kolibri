import { afterAll, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Log } from '../../schema/utils/dev.utils';
import { activeProp } from './active';
import { alertProp } from './alert';
import { allowMarkdownProp } from './allow-markdown';
import { disabledProp } from './disabled';
import { hasCloserProp } from './has-closer';
import { hasCreateButtonProp } from './has-create-button';
import { hasSettingsMenuProp } from './has-settings-menu';
import { hideLabelProp } from './hide-label';
import { inlineProp } from './inline';
import { openProp } from './open';
import { requiredTextProp } from './required-text';
import { showProp } from './show';
import { tableLoadingProp } from './table-loading';

/**
 * Pins the boolean prop definitions built on `normalizeBoolean`: a string is compared
 * case-insensitively with `'true'`, so every other string is `false`; a non-boolean, non-string
 * value is ignored with a developer warning.
 *
 * `devWarning` logs each distinct message once, so every invalid value below yields a message
 * unique to its prop.
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

const warn = jest.spyOn(Log, 'warn').mockImplementation(() => undefined);
const warnings = (): string[] => warn.mock.calls.map(([message]) => (Array.isArray(message) ? message.join(' ') : String(message)));

beforeEach(() => {
	warn.mockClear();
});

afterAll(() => {
	warn.mockRestore();
});

const BOOLEAN_PROPS: ReadonlyArray<{ name: string; definition: PropDefinition; defaultValue: boolean }> = [
	{ name: 'activeProp', definition: activeProp, defaultValue: false },
	{ name: 'alertProp', definition: alertProp, defaultValue: false },
	{ name: 'allowMarkdownProp', definition: allowMarkdownProp, defaultValue: false },
	{ name: 'disabledProp', definition: disabledProp, defaultValue: false },
	{ name: 'hasCloserProp', definition: hasCloserProp, defaultValue: false },
	{ name: 'hasCreateButtonProp', definition: hasCreateButtonProp, defaultValue: false },
	{ name: 'hasSettingsMenuProp', definition: hasSettingsMenuProp, defaultValue: false },
	{ name: 'hideLabelProp', definition: hideLabelProp, defaultValue: false },
	{ name: 'inlineProp', definition: inlineProp, defaultValue: true },
	{ name: 'openProp', definition: openProp, defaultValue: false },
	{ name: 'showProp', definition: showProp, defaultValue: false },
	{ name: 'tableLoadingProp', definition: tableLoadingProp, defaultValue: false },
];

describe.each(BOOLEAN_PROPS)('$name', ({ definition, defaultValue }) => {
	it.each([undefined, null])(`applies the default ${String(defaultValue)} for %p`, (value) => {
		expect(applied(definition, value)).toEqual([defaultValue]);
		expect(warnings()).toEqual([]);
	});

	it.each<[unknown, boolean]>([
		[true, true],
		[false, false],
		['true', true],
		['TRUE', true],
		['false', false],
		['', false],
		['yes', false],
	])('normalizes %p to %p', (value, expected) => {
		expect(applied(definition, value)).toEqual([expected]);
		expect(warnings()).toEqual([]);
	});

	it.each<unknown>([0, 1, {}, []])('ignores %p with a developer warning', (value) => {
		expect(applied(definition, value)).toEqual([]);
		expect(warnings()).toEqual([expect.stringContaining(`for '${definition.propName}' is not valid (Invalid boolean`)]);
	});
});

/**
 * `requiredTextProp` accepts a boolean (show or hide the default text) or a string (a custom
 * text) and passes both through without coercion.
 */
describe('requiredTextProp', () => {
	it.each([undefined, null])('applies the default true for %p', (value) => {
		expect(applied(requiredTextProp, value)).toEqual([true]);
	});

	it.each<unknown>([true, false, '', 'Pflichtfeld', 'false'])('passes %p through unchanged', (value) => {
		expect(applied(requiredTextProp, value)).toEqual([value]);
	});

	it.each<[unknown, string]>([
		[1, 'number'],
		[{}, 'object'],
	])('ignores %p with a developer warning', (value, type) => {
		expect(applied(requiredTextProp, value)).toEqual([]);
		expect(warnings()).toEqual([expect.stringContaining(`for 'requiredText' is not valid (Invalid requiredText: expected boolean or string, got ${type})`)]);
	});
});
