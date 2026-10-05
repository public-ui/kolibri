import { describe, expect, it } from '@jest/globals';
import type { RadioOption, SelectOption } from '../../../schema';
import { fillKeyOptionMap, normalizeOptionValues } from './options';

describe('fillKeyOptionMap', () => {
	const keysOf = (options: SelectOption<unknown>[]): Array<[string, unknown]> => {
		const map = new Map<string, RadioOption<unknown>>();
		fillKeyOptionMap(map, options);
		return Array.from(map.entries()).map(([key, option]) => [key, option.value]);
	};

	it('keys the options by their index', () => {
		expect(
			keysOf([
				{ label: 'A', value: 'a' },
				{ label: 'B', value: 'b' },
			]),
		).toEqual([
			['-0', 'a'],
			['-1', 'b'],
		]);
	});

	it('prefixes the options of an optgroup with the key of the group', () => {
		expect(
			keysOf([
				{ label: 'A', value: 'a' },
				{ label: 'Group', options: [{ label: 'B', value: 'b' }] },
			] as SelectOption<unknown>[]),
		).toEqual([
			['-0', 'a'],
			['-1-0', 'b'],
		]);
	});

	it('skips an option without a non-empty string label', () => {
		expect(
			keysOf([
				{ label: '', value: 'empty' },
				{ label: 1 as unknown as string, value: 1 },
				{ label: 'C', value: 'c' },
			]),
		).toEqual([['-2', 'c']]);
	});
});

describe('normalizeOptionValues', () => {
	it('uses the label as value for an option without value', () => {
		expect(normalizeOptionValues([{ label: 'A' } as RadioOption<unknown>, { label: 'B', value: 0 }])).toEqual([
			{ label: 'A', value: 'A' },
			{ label: 'B', value: 0 },
		]);
	});
});
