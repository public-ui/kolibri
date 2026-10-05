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
	return type === 'Date' ? new Date(raw) : (raw as Iso8601);
}
