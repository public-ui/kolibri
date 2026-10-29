import type { Iso8601 } from '../../../schema';

/**
 * Type in which `kol-input-date` received its value. The field returns its value in that type:
 * a `Date` for a `Date`, otherwise the ISO 8601 string. `null` stands for a value that was not set.
 */
export type DateValueType = 'Date' | 'String' | null;

export function getDateValueType(value: unknown): DateValueType {
	if (value instanceof Date) {
		return 'Date';
	}
	if (typeof value === 'string') {
		return 'String';
	}
	return null;
}

/** Returns the value of the native input in the type the field received it in; an empty input has no value. */
export function remapDateValue(raw: string, type: DateValueType): Date | Iso8601 | null {
	if (raw === '') {
		return null;
	}
	if (type !== 'Date') {
		return raw as Iso8601;
	}
	return parseDateValue(raw);
}

/** Matches the date-only ISO 8601 form, which JavaScript parses as UTC midnight. */
const DATE_ONLY_ISO = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Parses the value of the native date input into a `Date` of the same local calendar day. The
 * date-only form is split and built in local time, because `new Date('YYYY-MM-DD')` would read it
 * as UTC midnight and fall one day west of UTC. Forms with a time parse locally anyway.
 */
function parseDateValue(raw: string): Date {
	const match = DATE_ONLY_ISO.exec(raw);
	if (!match) {
		return new Date(raw);
	}
	return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}
