import { afterAll, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { alertTypeOptions, alertVariantOptions, alignPropTypeOptions } from '../../schema';
import { Log } from '../../schema/utils/dev.utils';
import { alertTypeProp } from './alert-type';
import { alertVariantProp } from './alert-variant';
import { alignProp } from './align';
import { ARIA_CURRENT_VALUE_OPTIONS, ariaCurrentValueProp } from './aria-current-value';
import { ariaExpandedProp } from './aria-expanded';
import { ariaHasPopupProp } from './aria-has-popup';
import { ariaSelectedProp } from './aria-selected';
import { buttonTypeProp } from './button-type';
import { linkRoleProp } from './link-role';
import { loadingProp } from './loading';
import { orientationOptions, orientationProp } from './orientation';
import { popoverAlignProp } from './popover-align';
import { tabBehaviorProp } from './tab-behavior';
import { tooltipAlignProp } from './tooltip-align';
import { variantDialogProp } from './variant-dialog';
import { progressVariantOptions, variantProgressProp } from './variant-progress';
import { variantQuoteProp } from './variant-quote';
import { spinVariantOptions, variantSpinProp } from './variant-spin';

/**
 * Pins the enum semantics adopted from #10719. The predecessor degraded an unknown value silently
 * to the `''` sentinel, which removed the attribute without telling anyone. The normalizers now
 * throw instead; the factory catches that, logs a `devWarning` and skips the callback, so the
 * render prop keeps the value it already had.
 *
 * The kept-value behavior is only observable on a *change* from a valid to an invalid value —
 * on first assignment the previous value is the default, which equals the old degraded result.
 * `kol-link` and `kol-link-wc` share these definitions, so this is their contract too.
 */
type EnumPropDefinition = {
	readonly propName: string;
	apply: (value: unknown, callback: (normalized: string) => void) => void;
};

const ENUM_PROPS: ReadonlyArray<{ name: string; definition: EnumPropDefinition; valid: unknown; normalized: string; invalid: unknown }> = [
	{ name: 'linkRoleProp', definition: linkRoleProp, valid: 'tab', normalized: 'tab', invalid: 'nonsense' },
	{ name: 'ariaExpandedProp', definition: ariaExpandedProp, valid: true, normalized: 'true', invalid: 'maybe' },
	{ name: 'ariaSelectedProp', definition: ariaSelectedProp, valid: true, normalized: 'true', invalid: 'maybe' },
	{ name: 'ariaHasPopupProp', definition: ariaHasPopupProp, valid: 'menu', normalized: 'menu', invalid: 'sidebar' },
];

describe.each(ENUM_PROPS)('$name', ({ definition, valid, normalized, invalid }) => {
	it('normalizes a valid value', () => {
		const callback = jest.fn();
		definition.apply(valid, callback);
		expect(callback).toHaveBeenCalledWith(normalized);
	});

	it('treats the empty string as "not set" without warning', () => {
		const callback = jest.fn();
		definition.apply('', callback);
		expect(callback).toHaveBeenCalledWith('');
	});

	it.each([undefined, null])('falls back to the unset default for %s', (value) => {
		const callback = jest.fn();
		definition.apply(value, callback);
		expect(callback).toHaveBeenCalledWith('');
	});

	it('ignores an invalid value instead of degrading it to the sentinel', () => {
		const callback = jest.fn();
		definition.apply(invalid, callback);
		expect(callback).not.toHaveBeenCalled();
	});

	it('keeps the previous value when a valid value is replaced by an invalid one', () => {
		let rendered: string | undefined;
		const render = (value: string) => {
			rendered = value;
		};

		definition.apply(valid, render);
		expect(rendered).toBe(normalized);

		definition.apply(invalid, render);
		expect(rendered).toBe(normalized);
	});
});

/**
 * `buttonTypeProp` is built on the same throw-on-invalid factory as `ENUM_PROPS` above, but its
 * default is `'button'`, not the `''` "not set" sentinel the other four share — an empty string
 * is itself an invalid `_type` value here, not a synonym for "unset". It therefore needs its own
 * semantics instead of a row in `ENUM_PROPS`.
 */
describe('buttonTypeProp', () => {
	it('normalizes a valid value', () => {
		const callback = jest.fn();
		buttonTypeProp.apply('submit', callback);
		expect(callback).toHaveBeenCalledWith('submit');
	});

	it.each([undefined, null])("falls back to the default 'button' for %s", (value) => {
		const callback = jest.fn();
		buttonTypeProp.apply(value, callback);
		expect(callback).toHaveBeenCalledWith('button');
	});

	it('ignores an invalid value instead of degrading it to a default', () => {
		const callback = jest.fn();
		buttonTypeProp.apply('nonsense', callback);
		expect(callback).not.toHaveBeenCalled();
	});

	it('keeps the previous value when a valid value is replaced by an invalid one', () => {
		let rendered: string | undefined;
		const render = (value: string) => {
			rendered = value;
		};

		buttonTypeProp.apply('reset', render);
		expect(rendered).toBe('reset');

		buttonTypeProp.apply('nonsense', render);
		expect(rendered).toBe('reset');
	});
});

const applied = (definition: EnumPropDefinition, value: unknown): unknown[] => {
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

/**
 * Enum props without an empty "not set" sentinel: each falls back to a default option and ignores
 * an unknown value with a developer warning, whether the normalizer throws or the validator
 * rejects it. Matching is case-sensitive.
 *
 * Several of them share the prop name `variant` and `devWarning` logs each distinct message once,
 * so the warning is checked with an invalid value unique to each prop.
 */
const STRICT_ENUM_PROPS: ReadonlyArray<{ name: string; definition: EnumPropDefinition; defaultValue: string; options: readonly string[] }> = [
	{ name: 'alertTypeProp', definition: alertTypeProp, defaultValue: 'default', options: alertTypeOptions },
	{ name: 'alertVariantProp', definition: alertVariantProp, defaultValue: 'msg', options: alertVariantOptions },
	{ name: 'alignProp', definition: alignProp, defaultValue: 'top', options: alignPropTypeOptions },
	{ name: 'loadingProp', definition: loadingProp, defaultValue: 'lazy', options: ['eager', 'lazy'] },
	{ name: 'orientationProp', definition: orientationProp, defaultValue: 'horizontal', options: orientationOptions },
	{ name: 'tabBehaviorProp', definition: tabBehaviorProp, defaultValue: 'select-automatic', options: ['select-automatic', 'select-manual'] },
	{ name: 'variantDialogProp', definition: variantDialogProp, defaultValue: 'blank', options: ['blank', 'card'] },
	{ name: 'variantProgressProp', definition: variantProgressProp, defaultValue: 'bar', options: progressVariantOptions },
	{ name: 'variantQuoteProp', definition: variantQuoteProp, defaultValue: 'inline', options: ['block', 'inline'] },
	{ name: 'variantSpinProp', definition: variantSpinProp, defaultValue: 'dot', options: spinVariantOptions },
];

describe.each(STRICT_ENUM_PROPS)('$name', ({ name, definition, defaultValue, options }) => {
	it.each([undefined, null])(`applies the default '${defaultValue}' for %p`, (value) => {
		expect(applied(definition, value)).toEqual([defaultValue]);
	});

	it.each(options)('accepts the option %p', (option) => {
		expect(applied(definition, option)).toEqual([option]);
		expect(warnings()).toEqual([]);
	});

	it.each<unknown>(['', options[0].toUpperCase(), ` ${options[0]}`, 1, {}])('ignores %p', (value) => {
		expect(applied(definition, value)).toEqual([]);
	});

	it('warns about an ignored value', () => {
		expect(applied(definition, name)).toEqual([]);
		expect(warnings()).toEqual([expect.stringContaining(`The property value "${name}" for '${definition.propName}' is not valid`)]);
	});

	it('keeps the previous value when a valid value is replaced by an invalid one', () => {
		let rendered: unknown;
		const render = (value: string) => {
			rendered = value;
		};

		definition.apply(options[options.length - 1], render);
		definition.apply('nonsense', render);
		expect(rendered).toBe(options[options.length - 1]);
	});
});

/**
 * Enum props that degrade an unknown string to their default instead of ignoring it, without a
 * developer warning. A non-string value that `normalizeString` cannot convert is still ignored
 * with a warning.
 */
const DEGRADING_ENUM_PROPS: ReadonlyArray<{ name: string; definition: EnumPropDefinition; defaultValue: string; options: readonly string[] }> = [
	{ name: 'ariaCurrentValueProp', definition: ariaCurrentValueProp, defaultValue: 'page', options: ARIA_CURRENT_VALUE_OPTIONS },
	{ name: 'popoverAlignProp', definition: popoverAlignProp, defaultValue: 'bottom', options: alignPropTypeOptions },
	{ name: 'tooltipAlignProp', definition: tooltipAlignProp, defaultValue: 'right', options: alignPropTypeOptions },
];

describe.each(DEGRADING_ENUM_PROPS)('$name', ({ definition, defaultValue, options }) => {
	it.each([undefined, null])(`applies the default '${defaultValue}' for %p`, (value) => {
		expect(applied(definition, value)).toEqual([defaultValue]);
	});

	it.each(options)('accepts the option %p', (option) => {
		expect(applied(definition, option)).toEqual([option]);
	});

	it.each<unknown>(['', 'nonsense', options[0].toUpperCase(), 1])(`degrades %p to '${defaultValue}' without a warning`, (value) => {
		expect(applied(definition, value)).toEqual([defaultValue]);
		expect(warnings()).toEqual([]);
	});

	it('ignores an object with a developer warning', () => {
		expect(applied(definition, {})).toEqual([]);
		expect(warnings()).toEqual([expect.stringContaining(`for '${definition.propName}' is not valid (Cannot convert object to string)`)]);
	});
});

describe('ariaCurrentValueProp', () => {
	it.each<[unknown, string]>([
		[true, 'true'],
		[false, 'false'],
	])('converts the boolean %p to the token %p', (value, expected) => {
		expect(applied(ariaCurrentValueProp, value)).toEqual([expected]);
	});
});
