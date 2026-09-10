import { describe, expect, it, jest } from '@jest/globals';
import { ariaExpandedProp } from './aria-expanded';
import { ariaHasPopupProp } from './aria-has-popup';
import { ariaSelectedProp } from './aria-selected';
import { buttonTypeProp } from './button-type';
import { linkRoleProp } from './link-role';

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
