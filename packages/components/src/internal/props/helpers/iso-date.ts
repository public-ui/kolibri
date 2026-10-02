import type { InputDateTypePropType, Iso8601 } from '../../../schema';

const ISO_DATE_PATTERN = /^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])/;
const ISO_LOCAL_DATE_TIME_PATTERN = /^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])[T ][0-2]\d:[0-5]\d(:[0-5]\d(?:\.\d+)?)?/;
const ISO_MONTH_PATTERN = /^\d{4}-([0]\d|1[0-2])/;
const ISO_TIME_PATTERN = /^[0-2]\d:[0-5]\d(:[0-5]\d(?:\.\d+)?)?/;
const ISO_WEEK_PATTERN = /^\d{4}-W(?:[0-4]\d|5[0-3])$/;

/**
 * Two-digit week number of the date, counted like ISO 8601: weeks start on Monday, and week 1 is the
 * week with the first Thursday of the year. The year of the week string is the calendar year of the
 * date, so e.g. 1 January 2021 becomes week 53 of 2021.
 */
export function getIsoWeekNumber(date: Date): string {
	const copiedDate = new Date(date);

	// Monday is day 0 of an ISO week.
	const nDay = (copiedDate.getDay() + 6) % 7;

	// The Thursday of the date's week decides the week number.
	copiedDate.setDate(copiedDate.getDate() - nDay + 3);
	const n1stThursday = copiedDate.valueOf();

	// The first Thursday of the year.
	copiedDate.setMonth(0, 1);
	if (copiedDate.getDay() !== 4) {
		copiedDate.setMonth(0, 1 + ((4 - copiedDate.getDay() + 7) % 7));
	}

	// Weeks between both Thursdays (604800000 = 7 * 24 * 3600 * 1000).
	const weekNumber = 1 + Math.ceil((n1stThursday - copiedDate.valueOf()) / 604800000);

	return weekNumber.toString().padStart(2, '0');
}

/**
 * Formats a `Date` as the ISO 8601 string of the date input type, in local time. A string or `null`
 * is returned unchanged; anything else, and a `Date` for an unknown type, yields `undefined`.
 * A time only has seconds when the step is not 60 seconds (the default).
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#using_the_step_attribute
 */
export function formatIsoDate(value: unknown, type?: InputDateTypePropType | string, step?: string | number): Iso8601 | string | null | undefined {
	if (typeof value === 'string' || value === null) {
		return value;
	}

	if (value instanceof Date) {
		const year = value.getFullYear();
		const month = String(value.getMonth() + 1).padStart(2, '0');
		const day = String(value.getDate()).padStart(2, '0');
		const hours = String(value.getHours()).padStart(2, '0');
		const minutes = String(value.getMinutes()).padStart(2, '0');
		const seconds = String(value.getSeconds()).padStart(2, '0');

		const date = [year, month, day].join('-');
		const timeWithSeconds = [hours, minutes, seconds].join(':');

		switch (type) {
			case 'date':
				return date;
			case 'datetime-local':
				return `${date}T${timeWithSeconds}`;
			case 'month':
				return `${year}-${month}`;
			case 'time':
				return step === undefined || String(step) === '60' ? `${hours}:${minutes}` : timeWithSeconds;
			case 'week':
				return `${year}-W${getIsoWeekNumber(value)}`;
		}
	}

	return undefined;
}

/** Whether the string starts with the ISO 8601 format of the date input type; an unknown type accepts nothing. */
export function isIsoDateString(value: string, type?: InputDateTypePropType | string): boolean {
	switch (type) {
		case 'date':
			return ISO_DATE_PATTERN.test(value);
		case 'datetime-local':
			return ISO_LOCAL_DATE_TIME_PATTERN.test(value);
		case 'month':
			return ISO_MONTH_PATTERN.test(value);
		case 'time':
			return ISO_TIME_PATTERN.test(value);
		case 'week':
			return ISO_WEEK_PATTERN.test(value);
		default:
			return false;
	}
}

/** Props of the date input the date props depend on: the raw `_type` and `_step` of the element. */
export type InputDateDeps = {
	type?: InputDateTypePropType | string;
	step?: number | string;
};

/**
 * Normalizes a date prop of `kol-input-date`: a `Date` becomes the ISO 8601 string of the type, a
 * string is kept, anything else clears the value.
 */
export function normalizeInputDate(value: unknown, { type, step }: InputDateDeps): string {
	return formatIsoDate(value, type, step) as string;
}

/** Accepts an unset or empty value and a string in the format of the type. */
export function isValidInputDate(value: string | undefined, { type }: InputDateDeps): boolean {
	return value === undefined || value === null || value === '' || isIsoDateString(value, type);
}
