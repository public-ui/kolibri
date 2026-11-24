export type NumberString = `${number}` | `${number}.${number}`;

const NUMBER_STRING_PATTERN = /^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/;

/**
 * Whether the value is a number string the number fields accept: a decimal number with an optional
 * sign, decimal part and exponent, without surrounding whitespace, that converts to a finite number.
 */
export function isNumberString(value: unknown): value is NumberString {
	return typeof value === 'string' && NUMBER_STRING_PATTERN.test(value) && Number.isFinite(Number(value));
}
