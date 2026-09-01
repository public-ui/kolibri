import { describe, expect, it } from '@jest/globals';

import { ariaExpandedProp } from './aria-expanded';
import { ariaHasPopupProp } from './aria-has-popup';
import { ariaSelectedProp } from './aria-selected';
import { linkRoleProp } from './link-role';
import { optionalTabIndexProp } from './tab-index';

/**
 * Records whether a prop definition applied a value at all, and which value it applied.
 *
 * That distinction is the whole contract under test: the factory only invokes the callback for a
 * value it accepted, so "not applied" means the render prop keeps whatever it had.
 */
function applyResult<T>(
	definition: { apply: (value: unknown, callback: (normalized: T) => void) => void },
	value: unknown,
): { applied: boolean; normalized?: T } {
	const applied: T[] = [];
	definition.apply(value, (normalized) => applied.push(normalized));
	return applied.length > 0 ? { applied: true, normalized: applied[0] } : { applied: false };
}

/**
 * These props normalize to a small token set and use `''` as the "not set" sentinel.
 *
 * Their normalizers **throw** on an unknown value instead of degrading to that sentinel. The
 * factory catches, logs a `devWarning` and does not invoke the callback — so the render prop keeps
 * whatever it had. That is a deliberate behaviour change over the predecessor validators, which
 * silently reset the value: a typo becomes visible in the console while the rendered result stays
 * untouched.
 *
 * `linkRoleProp` and `ariaExpandedProp` are shared with `kol-link`, so the change reaches that
 * component as well.
 */
describe('enum props with a "not set" sentinel', () => {
	describe('ariaExpandedProp', () => {
		it('normalizes booleans and their string equivalents to aria tokens', () => {
			expect(applyResult(ariaExpandedProp, true)).toEqual({ applied: true, normalized: 'true' });
			expect(applyResult(ariaExpandedProp, false)).toEqual({ applied: true, normalized: 'false' });
			expect(applyResult(ariaExpandedProp, 'true')).toEqual({ applied: true, normalized: 'true' });
			expect(applyResult(ariaExpandedProp, 'false')).toEqual({ applied: true, normalized: 'false' });
		});

		it('treats the empty string as "not set"', () => {
			expect(applyResult(ariaExpandedProp, '')).toEqual({ applied: true, normalized: '' });
		});

		it('falls back to the default when no value is given', () => {
			expect(applyResult(ariaExpandedProp, undefined)).toEqual({ applied: true, normalized: '' });
		});

		it('ignores invalid values instead of resetting the property', () => {
			expect(applyResult(ariaExpandedProp, 'yes')).toEqual({ applied: false });
			expect(applyResult(ariaExpandedProp, 'TRUE')).toEqual({ applied: false });
			expect(applyResult(ariaExpandedProp, 0)).toEqual({ applied: false });
		});
	});

	describe('ariaSelectedProp', () => {
		it('normalizes booleans to aria tokens and keeps the empty string as "not set"', () => {
			expect(applyResult(ariaSelectedProp, true)).toEqual({ applied: true, normalized: 'true' });
			expect(applyResult(ariaSelectedProp, false)).toEqual({ applied: true, normalized: 'false' });
			expect(applyResult(ariaSelectedProp, '')).toEqual({ applied: true, normalized: '' });
		});

		it('ignores invalid values', () => {
			expect(applyResult(ariaSelectedProp, 'maybe')).toEqual({ applied: false });
			expect(applyResult(ariaSelectedProp, 1)).toEqual({ applied: false });
		});
	});

	describe('ariaHasPopupProp', () => {
		it('accepts every aria-haspopup token and the empty string', () => {
			for (const token of ['dialog', 'false', 'grid', 'listbox', 'menu', 'tree', 'true', '']) {
				expect(applyResult(ariaHasPopupProp, token)).toEqual({ applied: true, normalized: token });
			}
		});

		it('ignores values outside the token set', () => {
			expect(applyResult(ariaHasPopupProp, 'popover')).toEqual({ applied: false });
			expect(applyResult(ariaHasPopupProp, 'Dialog')).toEqual({ applied: false });
			expect(applyResult(ariaHasPopupProp, 42)).toEqual({ applied: false });
		});
	});

	describe('linkRoleProp', () => {
		it('accepts the alternative roles and the empty string', () => {
			for (const role of ['tab', 'treeitem', '']) {
				expect(applyResult(linkRoleProp, role)).toEqual({ applied: true, normalized: role });
			}
		});

		it('ignores roles outside the allowed set', () => {
			expect(applyResult(linkRoleProp, 'button')).toEqual({ applied: false });
			expect(applyResult(linkRoleProp, 'TAB')).toEqual({ applied: false });
			expect(applyResult(linkRoleProp, 'link')).toEqual({ applied: false });
		});

		/**
		 * The regression this behaviour is about: an invalid value must not clear a valid one. A
		 * component rendering `role="tab"` that is handed garbage keeps `tab` and warns, instead of
		 * silently dropping the attribute — which is what a wrong ARIA role would deserve least.
		 */
		it('keeps the previous value when a valid value is replaced by an invalid one', () => {
			let renderProp: string = linkRoleProp.getDefaultValue();

			linkRoleProp.apply('tab', (value) => (renderProp = value));
			expect(renderProp).toBe('tab');

			linkRoleProp.apply('nonsense', (value) => (renderProp = value));
			expect(renderProp).toBe('tab');

			// Explicitly unsetting still works — the empty string is a valid "not set".
			linkRoleProp.apply('', (value) => (renderProp = value));
			expect(renderProp).toBe('');
		});
	});
});

describe('optionalTabIndexProp', () => {
	it('defaults to unset, so a natively focusable element renders no tabindex attribute', () => {
		expect(optionalTabIndexProp.getDefaultValue()).toBeUndefined();
	});

	it('restores the unset state when the property is cleared', () => {
		let renderProp: number | undefined = optionalTabIndexProp.getDefaultValue();

		optionalTabIndexProp.apply(-1, (value) => (renderProp = value));
		expect(renderProp).toBe(-1);

		optionalTabIndexProp.apply(undefined, (value) => (renderProp = value));
		expect(renderProp).toBeUndefined();
	});
});
