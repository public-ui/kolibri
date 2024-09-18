import { InputDateController } from './controller';

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

			it('throws an Error for type week', () => {
				expect(() => InputDateController.tryParseToString(TEST_DATE, 'week')).toThrowError('Auto convert to week is not supported!');
			});
		});
	});
});
