import { describe, expect, it } from '@jest/globals';

import { containsOnlyNumbers, hasEnoughReadableChars } from './label';

describe('string prop helpers', () => {
	describe('hasEnoughReadableChars', () => {
		it.each([
			['', 1, false],
			['ab', 3, false],
			['a-b-c', 3, true],
			['äöü', 3, true],
			['!?', 1, false],
		])('hasEnoughReadableChars(%p, %p) is %p', (value, min, expected) => {
			expect(hasEnoughReadableChars(value, min)).toBe(expected);
		});
	});

	describe('containsOnlyNumbers', () => {
		it.each([
			['123', true],
			['', false],
			['1.5', false],
			['12a', false],
		])('containsOnlyNumbers(%p) is %p', (value, expected) => {
			expect(containsOnlyNumbers(value)).toBe(expected);
		});
	});
});
