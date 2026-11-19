import { describe, expect, it, jest } from '@jest/globals';
import { formatIsoDate, getIsoWeekNumber, isIsoDateString } from './helpers/iso-date';
import { inputDateMaxProp } from './input-date-max';
import { inputDateMinProp } from './input-date-min';
import { inputDateTypeProp } from './input-date-type';
import { inputDateValueProp } from './value-input-date';

/**
 * Pins the date props and the ISO 8601 helpers of `kol-input-date` against the legacy
 * `InputDateController` they replace (G3b.1 of `docs/FORM_FIELD_SKELETON_MIGRATION_PLAN.md`).
 */
const TEST_DATE = new Date('2020-03-03T03:02:01.099');

describe('formatIsoDate', () => {
	it('returns a string or null unchanged', () => {
		expect(formatIsoDate('2020-03-04')).toBe('2020-03-04');
		expect(formatIsoDate(null)).toBeNull();
	});

	it.each([
		['date', undefined, '2020-03-03'],
		['datetime-local', undefined, '2020-03-03T03:02:01'],
		['month', undefined, '2020-03'],
		['time', undefined, '03:02'],
		['time', '60', '03:02'],
		['time', 60, '03:02'],
		['time', 10, '03:02:01'],
		['week', undefined, '2020-W10'],
	])('formats a Date for type %p with step %p as %p', (type, step, formatted) => {
		expect(formatIsoDate(TEST_DATE, type, step)).toBe(formatted);
	});

	it('returns undefined for another value or an unknown type', () => {
		expect(formatIsoDate(5, 'date')).toBeUndefined();
		expect(formatIsoDate(TEST_DATE, 'color')).toBeUndefined();
	});
});

describe('getIsoWeekNumber', () => {
	it.each([
		[TEST_DATE, '10'],
		[new Date('2021-01-01T03:02:01.099'), '53'],
		[new Date('2019-12-30T03:02:01.099'), '01'],
	])('returns the week of %p as %p', (date, week) => {
		expect(getIsoWeekNumber(date)).toBe(week);
	});
});

describe('isIsoDateString', () => {
	it.each([
		['2020-03-03', 'date', true],
		['03:02', 'date', false],
		['2020-03-03T03:02', 'datetime-local', true],
		['2020-03-03 03:02', 'datetime-local', true],
		['2020-03', 'month', true],
		['03:02:01.5', 'time', true],
		['2020-W53', 'week', true],
		['2020-W54', 'week', false],
		['2020-03-03', 'color', false],
	])('checks %p for type %p as %p', (value, type, valid) => {
		expect(isIsoDateString(value, type)).toBe(valid);
	});
});

type DependentDefinition = {
	apply: (value: unknown, callback: (normalized: unknown) => void, deps: { type?: string; step?: number | string }) => void;
};

const applied = (definition: DependentDefinition, value: unknown, type = 'date', step?: number | string): unknown[] => {
	const callback = jest.fn();
	definition.apply(value, callback, { type, step });
	return callback.mock.calls.map(([normalized]) => normalized);
};

describe.each([
	{ name: 'inputDateMaxProp', definition: inputDateMaxProp },
	{ name: 'inputDateMinProp', definition: inputDateMinProp },
	{ name: 'inputDateValueProp', definition: inputDateValueProp },
])('$name', ({ definition }) => {
	it.each([undefined, null])('applies the default undefined for %s', (value) => {
		expect(applied(definition, value)).toEqual([undefined]);
	});

	it('accepts a string in the format of the type and an empty string', () => {
		expect(applied(definition, '2020-03-03')).toEqual(['2020-03-03']);
		expect(applied(definition, '')).toEqual(['']);
		expect(applied(definition, '2020-W10', 'week')).toEqual(['2020-W10']);
	});

	it('formats a Date for the type and the step', () => {
		expect(applied(definition, TEST_DATE, 'time', 1)).toEqual(['03:02:01']);
	});

	it('clears the value for another value type', () => {
		expect(applied(definition, 5)).toEqual([undefined]);
	});

	it('ignores a string in another format', () => {
		expect(applied(definition, '03:02')).toEqual([]);
		expect(applied(definition, '2020-03-03', 'unknown')).toEqual([]);
	});
});

describe('inputDateTypeProp', () => {
	const appliedType = (value: unknown): unknown[] => {
		const callback = jest.fn();
		inputDateTypeProp.apply(value, callback);
		return callback.mock.calls.map(([normalized]) => normalized);
	};

	it('applies the default date', () => {
		expect(appliedType(undefined)).toEqual(['date']);
	});

	it.each(['date', 'datetime-local', 'month', 'time', 'week'])('accepts %p', (type) => {
		expect(appliedType(type)).toEqual([type]);
	});

	it('ignores an unknown type', () => {
		expect(appliedType('color')).toEqual([]);
	});
});
