import { isObject } from '../../../schema';

export function normalizeString(value?: unknown): string | never {
	if (typeof value === 'string') {
		return value;
	}
	if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
		return String(value);
	}
	throw new TypeError(`Cannot convert ${typeof value} to string`);
}

export function normalizeInteger(value?: unknown): number | never {
	if (typeof value === 'number') {
		return Number.isInteger(value) ? value : Math.round(value);
	}
	if (typeof value === 'string') {
		const parsed = parseInt(value, 10);
		if (!isNaN(parsed)) {
			return parsed;
		}
	}
	throw new Error(`Invalid integer: ${value as string}`);
}

export function normalizeNumber(value?: unknown): number | never {
	if (typeof value === 'number') {
		return value;
	}
	if (typeof value === 'string') {
		const parsed = Number(value);
		if (!isNaN(parsed)) {
			return parsed;
		}
	}
	throw new Error(`Invalid number: ${value as string}`);
}

export function normalizeBoolean(value?: unknown): boolean | never {
	if (typeof value === 'boolean') {
		return value;
	}
	if (typeof value === 'string') {
		return value.toLowerCase() === 'true';
	}
	throw new Error(`Invalid boolean: ${value as string}`);
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
