import { describe, expect, it, jest } from '@jest/globals';
import { customClassProp } from '../custom-class';
import { variantProp } from '../variant';
import { isSafeClassName } from './validators';

/**
 * Pins the SAFE_CLASS_NAME_RE semantics — see the rationale comment in validators.ts.
 * The unified regex is deliberately MORE LENIENT than the legacy variant-only regex
 * (minimum length 1 instead of 4) and STRICTER than the legacy custom-class validation
 * (which accepted any string). Both directions are part of the contract.
 */
describe('isSafeClassName', () => {
	it.each(['a', 'ab', 'abc', 'custom', 'theme-link', 'kol-link__anchor', 'A1'])('accepts "%s" (relaxed minimum: 1–3 char names are valid)', (value) => {
		expect(isSafeClassName(value)).toBe(true);
	});

	it.each(['1abc', '-abc', '_abc', 'foo bar', 'foo.bar', 'foo/bar', '', 'a'.repeat(62)])('rejects "%s" (must be a single safe class name)', (value) => {
		expect(isSafeClassName(value)).toBe(false);
	});

	it('accepts the maximum length of 61 characters', () => {
		expect(isSafeClassName('a'.repeat(61))).toBe(true);
	});
});

describe('customClassProp validation (stricter than develop: single safe class name only)', () => {
	it('accepts short single class names that were valid on develop (the reason for the relaxed minimum)', () => {
		const callback = jest.fn();
		customClassProp.apply('abc', callback);
		expect(callback).toHaveBeenCalledWith('abc');
	});

	it('rejects multi-class values like "foo bar" that develop accepted — documented behavior change', () => {
		const callback = jest.fn();
		customClassProp.apply('foo bar', callback);
		expect(callback).not.toHaveBeenCalled();
	});
});

describe('variantProp validation (widened: 1–3 char variant names are now valid)', () => {
	it('accepts a 1–3 character variant name that the legacy variant-only regex rejected', () => {
		const callback = jest.fn();
		variantProp.apply(['abc'], callback);
		expect(callback).toHaveBeenCalledWith(['abc']);
	});

	it('still rejects variant tokens that are not safe class names', () => {
		const callback = jest.fn();
		variantProp.apply(['foo bar'], callback);
		expect(callback).not.toHaveBeenCalled();
	});

	it('splits space-separated variant strings and validates each token', () => {
		const callback = jest.fn();
		variantProp.apply('custom theme-link', callback);
		expect(callback).toHaveBeenCalledWith(['custom', 'theme-link']);
	});
});
