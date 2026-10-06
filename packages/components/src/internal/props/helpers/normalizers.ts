import { isObject, type NumberString } from '../../../schema';

export function normalizeString(value?: unknown): string | never {
	if (typeof value === 'string') {
		return value;
	}
	if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
		return String(value);
	}
	throw new TypeError(`Cannot convert ${typeof value} to string`);
}

/**
 * Normalizes a value to an integer: a number or a numeric string (parsed as a whole with `Number`,
 * see `normalizeNumber`) is rounded with `Math.round`. `NaN`, the empty string and strings with
 * trailing characters (`'4px'`) throw.
 */
export function normalizeInteger(value?: unknown): number | never {
	let parsed: number;
	try {
		parsed = normalizeNumber(value);
	} catch {
		throw new Error(`Invalid integer: ${String(value)}`);
	}
	return Number.isInteger(parsed) ? parsed : Math.round(parsed);
}

/**
 * Normalizes a value to a number: a number passes, a string is parsed as a whole with `Number`
 * (surrounding whitespace is ignored). `NaN`, the empty string and whitespace-only strings throw.
 */
export function normalizeNumber(value?: unknown): number | never {
	if (typeof value === 'number' && !isNaN(value)) {
		return value;
	}
	if (typeof value === 'string' && value.trim() !== '') {
		const parsed = Number(value);
		if (!isNaN(parsed)) {
			return parsed;
		}
	}
	throw new Error(`Invalid number: ${String(value)}`);
}

/** Accepts only values of type `number` except `NaN`, like the legacy `watchNumber`; throws otherwise. */
export function normalizeNumberType(value?: unknown): number | never {
	if (typeof value === 'number' && !isNaN(value)) {
		return value;
	}
	throw new Error(`Invalid number: ${String(value)}`);
}

const NUMBER_STRING_PATTERN = /^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/;

/**
 * Whether the value is a number string the number fields accept: a decimal number with an optional
 * sign, decimal part and exponent, without surrounding whitespace, that converts to a finite number.
 */
export function isNumberString(value: unknown): value is NumberString {
	return typeof value === 'string' && NUMBER_STRING_PATTERN.test(value) && Number.isFinite(Number(value));
}

/**
 * Normalizes a numeric value of the number fields (`kol-input-number`, `kol-input-range`): a number
 * passes, `NaN` becomes `undefined` (the value is cleared), a number string is parsed, anything
 * else throws.
 */
export function normalizeInputNumber(value?: unknown): number | never {
	if (typeof value === 'number') {
		return (isNaN(value) ? undefined : value) as number;
	}
	if (isNumberString(value)) {
		return parseFloat(value);
	}
	throw new Error(`Invalid number: ${value as string}`);
}

/**
 * Normalizes a value to a boolean: a boolean passes, the strings `'true'` and `'false'` (in any
 * letter case) map to their boolean. Every other value throws, the empty string included: Stencil
 * already maps a present boolean attribute to `true` before a watcher receives it.
 */
export function normalizeBoolean(value?: unknown): boolean | never {
	if (typeof value === 'boolean') {
		return value;
	}
	if (typeof value === 'string') {
		const lowerCase = value.toLowerCase();
		if (lowerCase === 'true' || lowerCase === 'false') {
			return lowerCase === 'true';
		}
	}
	throw new Error(`Invalid boolean: ${String(value)}`);
}

/**
 * Normalizes a value to the `'true' | 'false' | ''` tri-state token shared by the aria boolean
 * props (`aria-expanded`, `aria-selected`, …): booleans and their string equivalents map to
 * `'true'`/`'false'`, the empty string means "not set" and passes through, anything else throws
 * with a message naming `propLabel` (e.g. `'aria-expanded'`).
 */
export function normalizeBooleanToken(value: unknown, propLabel: string): 'true' | 'false' | '' {
	if (value === true || value === 'true') {
		return 'true';
	}
	if (value === false || value === 'false') {
		return 'false';
	}
	if (value === '') {
		return '';
	}
	throw new Error(`Invalid ${propLabel} value: expected a boolean, got ${JSON.stringify(value)}`);
}

/**
 * Type guard for "is this string one of the given enum options" — the membership check shared by
 * every enum-style prop (aria-has-popup, link-role, button-type, …). Each caller still throws its
 * own propName-specific error message around it.
 */
export function isEnumOption<T extends string>(value: unknown, options: readonly T[]): value is T {
	return typeof value === 'string' && (options as readonly string[]).includes(value);
}

export function normalizeObject(value?: unknown): object | never {
	if (isObject(value)) {
		return value as object;
	}
	if (typeof value === 'string') {
		const parsed = JSON.parse(value) as unknown;
		if (isObject(parsed)) {
			return parsed as object;
		}
	}
	throw new Error(`Invalid object: ${value as string}`);
}

export function normalizeArray(value?: unknown): unknown[] | never {
	if (isObject(value) && Array.isArray(value)) {
		return value as unknown[];
	}
	if (typeof value === 'string') {
		const parsed = JSON.parse(value) as unknown;
		if (isObject(parsed) && Array.isArray(parsed)) {
			return parsed as unknown[];
		}
	}
	throw new Error(`Invalid array: ${value as string}`);
}

/**
 * Normalizes a callbacks object (the `_on` props). The prop factory's `apply` handles undefined/null
 * (falling back to the default `{}`) before this is reached, so we only need to verify a non-null
 * value is an object. Generic over the component-specific callbacks type (ButtonCallbacksPropType,
 * LinkOnCallbacksPropType, …).
 */
export function normalizeCallbacksObject<T>(value: unknown): T {
	if (typeof value === 'object' && value !== null) {
		return value as T;
	}
	throw new Error(`Invalid on callbacks: expected object, got ${typeof value}`);
}
