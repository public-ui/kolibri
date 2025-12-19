import { describe, expect, it } from '@jest/globals';
import { parseColumnWidth } from './controller';

describe('parseColumnWidth', () => {
	describe('valid numeric strings', () => {
		it('should parse "15" as 15', () => {
			expect(parseColumnWidth('15')).toBe(15);
		});

		it('should parse "100" as 100', () => {
			expect(parseColumnWidth('100')).toBe(100);
		});

		it('should parse "1" as 1', () => {
			expect(parseColumnWidth('1')).toBe(1);
		});

		it('should parse "999" as 999', () => {
			expect(parseColumnWidth('999')).toBe(999);
		});
	});

	describe('strings with units (parseFloat extracts leading number and preserves decimals)', () => {
		it('should parse "15ch" as 15 (parseFloat extracts leading number)', () => {
			expect(parseColumnWidth('15ch')).toBe(15);
		});

		it('should parse "20px" as 20', () => {
			expect(parseColumnWidth('20px')).toBe(20);
		});

		it('should parse "1.5rem" as 1.5 (parseFloat preserves decimals)', () => {
			expect(parseColumnWidth('1.5rem')).toBe(1.5);
		});

		it('should parse "50%" as 50', () => {
			expect(parseColumnWidth('50%')).toBe(50);
		});

		it('should parse "15ch" as 15 even with custom default', () => {
			expect(parseColumnWidth('15ch', 200)).toBe(15);
		});

		it('should return default width for unit-only strings like "ch"', () => {
			expect(parseColumnWidth('ch')).toBe(100);
		});

		it('should return default width for unit-only strings like "px"', () => {
			expect(parseColumnWidth('px')).toBe(100);
		});
	});

	describe('invalid inputs', () => {
		it('should return default width for empty string', () => {
			expect(parseColumnWidth('')).toBe(100);
		});

		it('should return default width for "invalid"', () => {
			expect(parseColumnWidth('invalid')).toBe(100);
		});

		it('should return default width for undefined', () => {
			expect(parseColumnWidth(undefined)).toBe(100);
		});

		it('should return default width for null-like input', () => {
			expect(parseColumnWidth(null as unknown as string)).toBe(100);
		});

		it('should return custom default width for invalid input', () => {
			expect(parseColumnWidth('invalid', 150)).toBe(150);
		});
	});

	describe('edge cases', () => {
		it('should return default width for "0" (not positive)', () => {
			expect(parseColumnWidth('0')).toBe(100);
		});

		it('should return default width for "-5" (negative number)', () => {
			expect(parseColumnWidth('-5')).toBe(100);
		});

		it('should parse "0.5" as 0.5 (parseFloat preserves decimals)', () => {
			expect(parseColumnWidth('0.5')).toBe(0.5);
		});

		it('should parse "10.9" as 10.9', () => {
			expect(parseColumnWidth('10.9')).toBe(10.9);
		});

		it('should parse "99.1" as 99.1', () => {
			expect(parseColumnWidth('99.1')).toBe(99.1);
		});

		it('should handle very large numbers', () => {
			expect(parseColumnWidth('999999')).toBe(999999);
		});

		it('should handle leading whitespace', () => {
			expect(parseColumnWidth('  50')).toBe(50);
		});

		it('should handle numbers with trailing text', () => {
			expect(parseColumnWidth('50abc')).toBe(50);
		});
	});

	describe('default width behavior', () => {
		it('should use default width of 100 when no default provided', () => {
			expect(parseColumnWidth('invalid')).toBe(100);
		});

		it('should use custom default width when provided', () => {
			expect(parseColumnWidth('invalid', 200)).toBe(200);
		});

		it('should use default width of 0 when explicitly set', () => {
			expect(parseColumnWidth('invalid', 0)).toBe(0);
		});

		it('should use negative default width when explicitly set', () => {
			expect(parseColumnWidth('invalid', -10)).toBe(-10);
		});
	});
});
