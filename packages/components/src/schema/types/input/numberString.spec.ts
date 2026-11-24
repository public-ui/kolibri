import { describe, expect, it } from '@jest/globals';
import { isNumberString } from './numberString';

describe('isNumberString', () => {
	it.each<unknown>(['0', '5', '007', '12.5', '0.25', '-1', '+1', '1e3', '-2.5E-3', '.5', '5.'])('accepts %p', (value) => {
		expect(isNumberString(value)).toBe(true);
	});

	it.each<unknown>(['', ' 5', '5 ', '-', '.', 'e3', '1e', '1e400', '0x10', '1,5', '1.2.3', 'abc', 'NaN', 'Infinity', 5, undefined, null])(
		'rejects %p',
		(value) => {
			expect(isNumberString(value)).toBe(false);
		},
	);
});
