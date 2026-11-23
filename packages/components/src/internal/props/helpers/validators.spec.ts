import { describe, expect, it, jest } from '@jest/globals';
import { customClassProp } from '../custom-class';
import { variantProp } from '../variant';
import { isSafeClassName } from './validators';

/**
 * Pins the class-name rule of validators.ts: a single safe class name of 1–61 characters,
 * shared by `_customClass` and `_variant`.
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

describe('customClassProp validation (single safe class name only)', () => {
	it('accepts short single class names', () => {
		const callback = jest.fn();
		customClassProp.apply('abc', callback);
		expect(callback).toHaveBeenCalledWith('abc');
	});

	it('rejects multi-class values like "foo bar"', () => {
		const callback = jest.fn();
		customClassProp.apply('foo bar', callback);
		expect(callback).not.toHaveBeenCalled();
	});
});

describe('variantProp validation (1–3 char variant names are valid)', () => {
	it('accepts a 1–3 character variant name', () => {
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
