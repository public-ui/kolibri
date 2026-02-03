import { isObject } from '../../../../../../schema';

export function normalizeString(value?: unknown): string | never {
	if (typeof value === 'string') {
		return value;
	}
	if (value !== null && value !== undefined) {
		return String(value);
	}
	throw new Error(`Invalid string: ${value}`);
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
export function normalizeObject(value?: unknown): object | never {
	if (isObject(value)) {
		return value;
	}
	if (typeof value === 'string') {
		const parsed = JSON.parse(value) as unknown;
		if (isObject(parsed)) {
			return parsed;
		}
	}
	throw new Error(`Invalid object: ${value as string}`);
}

export function normalizeArray(value?: unknown): unknown[] | never {
	if (isObject(value) && Array.isArray(value)) {
		return value;
	}
	if (typeof value === 'string') {
		const parsed = JSON.parse(value) as unknown;
		if (isObject(parsed) && Array.isArray(parsed)) {
			return parsed;
		}
	}
	throw new Error(`Invalid array: ${value as string}`);
}
