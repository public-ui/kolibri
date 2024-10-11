import { InputDateController } from './controller';
import { describe, it, expect } from '@jest/globals';

const TEST_DATE = new Date('2020-03-03T03:02:01.099');

describe('InputDateController', () => {
	describe('method tryParseToString', () => {
		it(`returns the value when it's a string`, () => {
			expect(InputDateController.tryParseToString('2020-03-04')).toBe('2020-03-04');
		});

		it(`returns the value when it's null`, () => {
			expect(InputDateController.tryParseToString(null)).toBeNull();
		});

		describe('when the type is date', () => {
			it('returns a ISO8601 date string for type date', () => {
				expect(InputDateController.tryParseToString(TEST_DATE, 'date')).toBe('2020-03-03');
			});

			it('returns a ISO8601 datetime string for type datetime-local', () => {
				expect(InputDateController.tryParseToString(TEST_DATE, 'datetime-local')).toBe('2020-03-03T03:02:01');
			});

			it('returns a ISO8601 month string for type month', () => {
				expect(InputDateController.tryParseToString(TEST_DATE, 'month')).toBe('2020-03');
			});

			it('returns a ISO8601 time string omitting seconds for type time with no step', () => {
				expect(InputDateController.tryParseToString(TEST_DATE, 'time')).toBe('03:02');
			});

			it('returns a ISO8601 time string omitting seconds for type time with a step of string "60"', () => {
				expect(InputDateController.tryParseToString(TEST_DATE, 'time', '60')).toBe('03:02');
			});

			it('returns a ISO8601 time string omitting seconds for type time with a step of number 60', () => {
				expect(InputDateController.tryParseToString(TEST_DATE, 'time', 60)).toBe('03:02');
			});

			it('returns a ISO8601 time string including seconds for type time with a step != "60"', () => {
				expect(InputDateController.tryParseToString(TEST_DATE, 'time', 10)).toBe('03:02:01');
			});

			it('returns a ISO8601 week string for type week', () => {
				expect(InputDateController.tryParseToString(TEST_DATE, 'week')).toBe('2020-W10');
			});
		});
	});
	describe('method getWeekNumberOfDate', () => {
		it('should return correct WeekOfYear', () => {
			expect(InputDateController.getWeekNumberOfDate(TEST_DATE)).toBe('10');
		});

		it('should return correct WeekOfYear when first day of year is in last kw', () => {
			const date = new Date('2021-01-01T03:02:01.099');
			expect(InputDateController.getWeekNumberOfDate(date)).toBe('53');
		});

		it('should return correct WeekOfYear when last years week is in first kw ', () => {
			const date = new Date('2019-12-30T03:02:01.099');
			expect(InputDateController.getWeekNumberOfDate(date)).toBe('01');
		});
	});
});
