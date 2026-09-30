import { describe, expect, it } from '@jest/globals';
import { getDateValueType, remapDateValue } from './date-value';

/**
 * Pins the value handling of the legacy `kol-input-date` (G3b.1 of
 * `docs/FORM_FIELD_SKELETON_MIGRATION_PLAN.md`).
 */
describe('getDateValueType', () => {
	it.each([
		[new Date(2020, 2, 3), 'Date'],
		['2020-03-03', 'String'],
		['', 'String'],
		[null, null],
		[undefined, null],
	])('classifies %p as %p', (value, type) => {
		expect(getDateValueType(value)).toBe(type);
	});
});

describe('remapDateValue', () => {
	it('returns null for an empty input', () => {
		expect(remapDateValue('', 'Date')).toBeNull();
		expect(remapDateValue('', 'String')).toBeNull();
	});

	it('returns the string unless the value was set as a Date', () => {
		expect(remapDateValue('2020-03-03', 'String')).toBe('2020-03-03');
		expect(remapDateValue('2020-03-03', null)).toBe('2020-03-03');
	});

	it('returns a Date when the value was set as a Date', () => {
		expect(remapDateValue('2020-03-03T03:02', 'Date')).toEqual(new Date('2020-03-03T03:02'));
	});
});
