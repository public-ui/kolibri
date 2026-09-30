import type { NumberString } from '../../../schema';
import { isNumberString } from '../../props/helpers/normalizers';

/**
 * Type in which a number field received its value. The field returns its value in that type, e.g. a
 * string for `_value="5"` (#9170). `'null'` stands for a value that was not set.
 */
export type NumberValueType = 'NumberString' | 'number' | 'null';

export function getNumberValueType(value: unknown): NumberValueType {
	if (isNumberString(value)) {
		return 'NumberString';
	}
	if (typeof value === 'number' && !isNaN(value)) {
		return 'number';
	}
	return 'null';
}

/** Returns the value in the type the field received it in; an unset value becomes `null`. */
export function remapNumberValue(value: number | null | undefined, type: NumberValueType): number | NumberString | null {
	if (value === undefined || value === null) {
		return null;
	}
	if (type === 'NumberString') {
		return String(value) as NumberString;
	}
	return value;
}

/** Parses the value of a native number input of `kol-input-number`: an empty input has no value. */
export function parseInputNumberValue(raw?: string): number | null {
	return raw === '' ? null : Number(raw);
}

/**
 * Parses the value of a native input of `kol-input-range` and clamps it to the bounds. A bound of `0`
 * does not clamp (#10861), and an empty input yields `NaN`.
 */
export function clampRangeValue(raw: string, min?: number | null, max?: number | null): number {
	const value = parseFloat(raw);
	if (max && value > max) {
		return max;
	}
	if (min && value < min) {
		return min;
	}
	return value;
}
