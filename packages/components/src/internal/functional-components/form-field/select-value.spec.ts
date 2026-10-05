import { describe, expect, it } from '@jest/globals';
import { assertSelectValueMatchesMultiplicity, normalizeSelectValue } from './select-value';

const options = [
	{ label: 'Eins', value: 1 },
	{ label: 'Zwei', value: 2 },
];

describe('assertSelectValueMatchesMultiplicity', () => {
	it.each([
		['a single value in single mode', 'a', false],
		['undefined in single mode', undefined, false],
		['a list in multiple mode', ['a'], true],
		['undefined in multiple mode', undefined, true],
	])('accepts %s', (_name, value, multiple) => {
		expect(() => assertSelectValueMatchesMultiplicity(value, multiple, 'received')).not.toThrow();
	});

	it('rejects a list in single mode', () => {
		expect(() => assertSelectValueMatchesMultiplicity(['a'], false, 'received')).toThrow(
			'↑ The schema for the property (_value) is not valid for single mode. Expected a single value. The value will not be changed. (received = ["a"])',
		);
	});

	it('rejects a single value in multiple mode', () => {
		expect(() => assertSelectValueMatchesMultiplicity('a', true, 'current')).toThrow(
			'↑ The schema for the property (_value) is not valid for multiple mode. Expected an array. The value will not be changed. (current = "a")',
		);
	});
});

describe('normalizeSelectValue', () => {
	it('preselects the first option in single mode without a value', () => {
		expect(normalizeSelectValue([], options, false)).toEqual([1]);
	});

	it('preselects undefined when the first entry is an optgroup', () => {
		expect(normalizeSelectValue([], [{ label: 'Gruppe', options }], false)).toEqual([undefined]);
	});

	it.each([
		['a value', [2], options, false],
		['a value outside the options', ['x'], options, false],
		['multiple mode', [], options, true],
		['an undefined multiple flag', [], options, undefined],
		['no options', [], [], false],
	])('keeps the value with %s', (_name, value, list, multiple) => {
		const result = normalizeSelectValue(value, list, multiple);
		expect(result).toBe(value);
	});
});
