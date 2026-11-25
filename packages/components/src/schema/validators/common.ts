import type { NumberString } from '../types/input/numberString';

const NUMBER_STRING_PATTERN = /^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/;

/**
 * Whether the value is a number string the number fields accept: a decimal number with an optional
 * sign, decimal part and exponent, without surrounding whitespace, that converts to a finite number.
 */
export function isNumberString(value: unknown): value is NumberString {
	return typeof value === 'string' && NUMBER_STRING_PATTERN.test(value) && Number.isFinite(Number(value));
}

export const isObject = (value: unknown): boolean => typeof value === 'object' && value !== null;

export const isString = (value: unknown, minLength = 0): boolean => typeof value === 'string' && value.length >= minLength;

export const isStyle = (style?: Record<string, string>): boolean => {
	if (typeof style === 'object' && style !== null) {
		for (const property in style) {
			if (isString(property, 1) === false) {
				return false;
			}
		}
	} else {
		return isString(style, 1);
	}
	return true;
};

/**
 * Fix event instance for state changes.
 */
export const STATE_CHANGE_EVENT = new Event('StateChange');
