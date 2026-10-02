import { afterAll, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Log } from '../../schema/utils/dev.utils';
import { colorProp } from './color';
import { smartButtonProp } from './smart-button';
import { spanIconsProp } from './span-icons';

/**
 * Pins the object prop definitions that also accept a JSON string (set through an HTML attribute)
 * and, for `colorProp` and `spanIconsProp`, a plain string shorthand.
 */
type PropDefinition = {
	readonly propName: string;
	apply: (value: unknown, callback: (normalized: unknown) => void) => void;
};

const applied = (definition: PropDefinition, value: unknown): unknown[] => {
	const callback = jest.fn();
	definition.apply(value, callback);
	return callback.mock.calls.map(([normalized]) => normalized);
};

const error = jest.spyOn(Log, 'error').mockImplementation(() => undefined);
const warn = jest.spyOn(Log, 'warn').mockImplementation(() => undefined);
const warnings = (): string[] => warn.mock.calls.map(([message]) => (Array.isArray(message) ? message.join(' ') : String(message)));

beforeEach(() => {
	error.mockClear();
	warn.mockClear();
});

afterAll(() => {
	error.mockRestore();
	warn.mockRestore();
});

/**
 * A color is a hex string (background only) or a hex pair, as an object or its JSON string. Both
 * pass through `createContrastColorPair`, which adjusts the foreground to a contrast ratio of 7 to
 * the background and returns the shortest hex notation.
 */
describe('colorProp', () => {
	const pair = { backgroundColor: '#003366', foregroundColor: '#ffffff' };

	it.each([undefined, null])('applies the default pair for %p', (value) => {
		expect(applied(colorProp, value)).toEqual([{ backgroundColor: '#d3d3d3', foregroundColor: '#3f3f3f' }]);
	});

	it.each<[unknown, unknown]>([
		['#003366', { backgroundColor: '#036', foregroundColor: '#7dcaff' }],
		['#FFF', { backgroundColor: '#fff', foregroundColor: '#595959' }],
		['#00336680', { backgroundColor: '#00336680', foregroundColor: '#7dcaff' }],
		[pair, { backgroundColor: '#036', foregroundColor: '#fff' }],
		[JSON.stringify(pair), { backgroundColor: '#036', foregroundColor: '#fff' }],
		[
			{ backgroundColor: '#ffffff', foregroundColor: '#ffffff' },
			{ backgroundColor: '#fff', foregroundColor: '#595959' },
		],
	])('normalizes %p to %p', (value, expected) => {
		expect(applied(colorProp, value)).toEqual([expected]);
		expect(warnings()).toEqual([]);
	});

	it.each<unknown>(['red', '#12', '#gggggg', '', { backgroundColor: '#003366' }, { backgroundColor: 'red', foregroundColor: '#ffffff' }, 5, true])(
		'ignores %p with a developer warning',
		(value) => {
			expect(applied(colorProp, value)).toEqual([]);
			expect(warnings()).toContainEqual(expect.stringContaining(`for 'color' is not valid`));
		},
	);
});

describe('smartButtonProp', () => {
	const button = { _icons: 'kolicon-info', _label: 'Info' };

	it.each([undefined, null])("applies the default { _label: '' } for %p", (value) => {
		expect(applied(smartButtonProp, value)).toEqual([{ _label: '' }]);
	});

	it('accepts an object by reference', () => {
		const [normalized] = applied(smartButtonProp, button);
		expect(normalized).toBe(button);
	});

	it.each<string>([JSON.stringify(button), "{'_icons':'kolicon-info','_label':'Info'}"])('parses the JSON string %p', (value) => {
		expect(applied(smartButtonProp, value)).toEqual([button]);
	});

	it.each<unknown>(['Info', '"Info"', 'null', '', 5, true])('ignores %p with a developer warning', (value) => {
		expect(applied(smartButtonProp, value)).toEqual([]);
		expect(warnings()).toContainEqual(expect.stringContaining(`for 'smartButton' is not valid`));
	});
});

/**
 * `spanIconsProp` accepts an icon class string or a directional icons object. Every falsy value
 * resets to `{}`.
 */
describe('spanIconsProp', () => {
	const icons = { left: 'kolicon-chevron-left', right: { icon: 'kolicon-chevron-right' } };

	it.each([undefined, null])('applies the default {} for %p', (value) => {
		expect(applied(spanIconsProp, value)).toEqual([{}]);
	});

	it.each<unknown>(['', 0, false])('resets the falsy value %p to {}', (value) => {
		expect(applied(spanIconsProp, value)).toEqual([{}]);
	});

	it.each<string>(['kolicon-plus', ' ', 'kolicon-plus kolicon-minus', 'null'])('passes the icon class string %p through', (value) => {
		expect(applied(spanIconsProp, value)).toEqual([value]);
	});

	it('accepts an object by reference', () => {
		const [normalized] = applied(spanIconsProp, icons);
		expect(normalized).toBe(icons);
	});

	it.each<string>([JSON.stringify(icons), ` ${JSON.stringify(icons)}`])('parses the JSON string %p', (value) => {
		expect(applied(spanIconsProp, value)).toEqual([icons]);
	});

	it.each<[unknown, string]>([
		['{', 'JSON'],
		['[1', 'JSON'],
		[5, 'Invalid icons: number'],
		[true, 'Invalid icons: boolean'],
	])('ignores %p with a developer warning', (value, reason) => {
		expect(applied(spanIconsProp, value)).toEqual([]);
		expect(warnings()).toEqual([expect.stringContaining(`for 'icons' is not valid (`)]);
		expect(warnings()[0]).toContain(reason);
	});
});
