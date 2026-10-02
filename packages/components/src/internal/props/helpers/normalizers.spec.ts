import { describe, expect, it } from '@jest/globals';
import {
	isEnumOption,
	isNumberString,
	normalizeArray,
	normalizeBoolean,
	normalizeBooleanToken,
	normalizeCallbacksObject,
	normalizeInputNumber,
	normalizeInteger,
	normalizeNumber,
	normalizeObject,
	normalizeString,
} from './normalizers';

/**
 * Pins the coercion contract of the shared prop normalizers. A normalizer either returns the
 * normalized value or throws; `createPropDefinition` turns a throw into a developer warning and
 * ignores the value (see `factory.ts`).
 */
const noop = () => undefined;

describe('normalizeString', () => {
	it.each<[unknown, string]>([
		['abc', 'abc'],
		['', ''],
		[' padded ', ' padded '],
		[0, '0'],
		[5, '5'],
		[-1.5, '-1.5'],
		[NaN, 'NaN'],
		[Infinity, 'Infinity'],
		[true, 'true'],
		[false, 'false'],
		[BigInt(10), '10'],
	])('normalizes %p to %p', (value, expected) => {
		expect(normalizeString(value)).toBe(expected);
	});

	it.each<[unknown, string]>([
		[undefined, 'undefined'],
		[null, 'object'],
		[{}, 'object'],
		[[], 'object'],
		[noop, 'function'],
		[Symbol('s'), 'symbol'],
	])('throws a TypeError for %p', (value, type) => {
		expect(() => normalizeString(value)).toThrow(new TypeError(`Cannot convert ${type} to string`));
	});
});

describe('normalizeInteger', () => {
	it.each<[unknown, number]>([
		[0, 0],
		[5, 5],
		[-3, -3],
		[1.4, 1],
		[1.5, 2],
		[-1.5, -1],
		[Infinity, Infinity],
		['5', 5],
		['-3', -3],
		[' 7', 7],
		['5.9', 5],
		['12px', 12],
		['1e3', 1],
		['0x10', 0],
	])('normalizes %p to %p', (value, expected) => {
		expect(normalizeInteger(value)).toBe(expected);
	});

	it('passes NaN through as NaN', () => {
		expect(normalizeInteger(NaN)).toBeNaN();
	});

	it.each<unknown>(['', 'abc', 'px12', undefined, null, true, {}, []])('throws for %p', (value) => {
		expect(() => normalizeInteger(value)).toThrow('Invalid integer');
	});
});

describe('normalizeNumber', () => {
	it.each<[unknown, number]>([
		[0, 0],
		[5, 5],
		[-2, -2],
		[1.5, 1.5],
		[Infinity, Infinity],
		['5', 5],
		['-2', -2],
		['1.5', 1.5],
		['.5', 0.5],
		['1e3', 1000],
		['0x10', 16],
		['Infinity', Infinity],
		[' 7 ', 7],
		['', 0],
		[' ', 0],
	])('normalizes %p to %p', (value, expected) => {
		expect(normalizeNumber(value)).toBe(expected);
	});

	it('passes NaN through as NaN', () => {
		expect(normalizeNumber(NaN)).toBeNaN();
	});

	it.each<unknown>(['abc', '12px', '1,5', undefined, null, true, {}, []])('throws for %p', (value) => {
		expect(() => normalizeNumber(value)).toThrow('Invalid number');
	});
});

describe('isNumberString', () => {
	it.each<unknown>(['0', '5', '007', '12.5', '0.25'])('accepts %p', (value) => {
		expect(isNumberString(value)).toBe(true);
	});

	it.each<unknown>(['', ' 5', '5 ', '-1', '+1', '1e3', '.5', '5.', '1,5', '1.2.3', 'abc', 'NaN', 5, undefined, null])('rejects %p', (value) => {
		expect(isNumberString(value)).toBe(false);
	});
});

describe('normalizeInputNumber', () => {
	it.each<[unknown, number]>([
		[0, 0],
		[5, 5],
		[-3, -3],
		[1.5, 1.5],
		[Infinity, Infinity],
		['0', 0],
		['007', 7],
		['12.5', 12.5],
	])('normalizes %p to %p', (value, expected) => {
		expect(normalizeInputNumber(value)).toBe(expected);
	});

	it('clears NaN to undefined', () => {
		expect(normalizeInputNumber(NaN)).toBeUndefined();
	});

	it.each<unknown>(['', '-1', '1e3', ' 5', 'abc', undefined, null, true, {}, []])('throws for %p', (value) => {
		expect(() => normalizeInputNumber(value)).toThrow('Invalid number');
	});
});

describe('normalizeBoolean', () => {
	it.each<[unknown, boolean]>([
		[true, true],
		[false, false],
		['true', true],
		['TRUE', true],
		['True', true],
		['false', false],
		['', false],
		[' true', false],
		['1', false],
		['yes', false],
	])('normalizes %p to %p', (value, expected) => {
		expect(normalizeBoolean(value)).toBe(expected);
	});

	it.each<unknown>([0, 1, undefined, null, {}, []])('throws for %p', (value) => {
		expect(() => normalizeBoolean(value)).toThrow('Invalid boolean');
	});
});

describe('normalizeBooleanToken', () => {
	it.each<[unknown, string]>([
		[true, 'true'],
		['true', 'true'],
		[false, 'false'],
		['false', 'false'],
		['', ''],
	])('normalizes %p to %p', (value, expected) => {
		expect(normalizeBooleanToken(value, 'aria-expanded')).toBe(expected);
	});

	it.each<[unknown, string]>([
		['TRUE', '"TRUE"'],
		['yes', '"yes"'],
		[1, '1'],
		[null, 'null'],
		[undefined, 'undefined'],
		[{}, '{}'],
	])('throws for %p with a message naming the prop', (value, printed) => {
		expect(() => normalizeBooleanToken(value, 'aria-expanded')).toThrow(`Invalid aria-expanded value: expected a boolean, got ${printed}`);
	});
});

describe('isEnumOption', () => {
	const options = ['a', 'b'] as const;

	it.each<unknown>(['a', 'b'])('accepts the option %p', (value) => {
		expect(isEnumOption(value, options)).toBe(true);
	});

	it.each<unknown>(['c', 'A', '', ' a', 1, undefined, null, ['a']])('rejects %p', (value) => {
		expect(isEnumOption(value, options)).toBe(false);
	});

	it('rejects every value for empty options', () => {
		expect(isEnumOption('', [])).toBe(false);
	});
});

describe('normalizeObject', () => {
	it.each<object>([{}, { a: 1 }, [], [1]])('returns the object %p by reference', (value) => {
		expect(normalizeObject(value)).toBe(value);
	});

	it.each<[string, object]>([
		['{"a":1}', { a: 1 }],
		['{}', {}],
		['[1,2]', [1, 2]],
	])('parses the JSON string %p', (value, expected) => {
		expect(normalizeObject(value)).toEqual(expected);
	});

	it.each<unknown>(['null', '1', '"text"', 'true', undefined, null, 1, true, noop])('throws for %p', (value) => {
		expect(() => normalizeObject(value)).toThrow('Invalid object');
	});

	it.each<string>(['', 'abc', '{', "{'a':1}"])('throws a SyntaxError for the unparsable string %p', (value) => {
		expect(() => normalizeObject(value)).toThrow(SyntaxError);
	});
});

describe('normalizeArray', () => {
	it.each<[unknown[]]>([[[]], [[1, 2]], [[{ a: 1 }]]])('returns the array %p by reference', (value) => {
		expect(normalizeArray(value)).toBe(value);
	});

	it.each<[string, unknown[]]>([
		['[]', []],
		['[1,2]', [1, 2]],
		['[{"a":1}]', [{ a: 1 }]],
	])('parses the JSON string %p', (value, expected) => {
		expect(normalizeArray(value)).toEqual(expected);
	});

	it.each<unknown>(['{}', 'null', '1', '"text"', {}, { length: 0 }, undefined, null, 1, true])('throws for %p', (value) => {
		expect(() => normalizeArray(value)).toThrow('Invalid array');
	});

	it.each<string>(['', 'abc', '[', "['a']"])('throws a SyntaxError for the unparsable string %p', (value) => {
		expect(() => normalizeArray(value)).toThrow(SyntaxError);
	});
});

describe('normalizeCallbacksObject', () => {
	it.each<object>([{}, { onClick: noop }, []])('returns the object %p by reference', (value) => {
		expect(normalizeCallbacksObject(value)).toBe(value);
	});

	it.each<[unknown, string]>([
		['{}', 'string'],
		[1, 'number'],
		[true, 'boolean'],
		[undefined, 'undefined'],
		[null, 'object'],
		[noop, 'function'],
	])('throws for %p', (value, type) => {
		expect(() => normalizeCallbacksObject(value)).toThrow(`Invalid on callbacks: expected object, got ${type}`);
	});
});
