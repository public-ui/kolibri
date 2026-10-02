import { describe, expect, it, jest } from '@jest/globals';
import { kolibriColorProp } from './kolibri-color';
import { labeledProp } from './labeled';

/**
 * Pins the props of `kol-kolibri` against the legacy `validateColor` and `watchBoolean` they replace.
 */
type PropDefinition = {
	apply: (value: unknown, callback: (normalized: unknown) => void) => void;
};

const applied = (definition: PropDefinition, value: unknown): unknown[] => {
	const callback = jest.fn();
	definition.apply(value, callback);
	return callback.mock.calls.map(([normalized]) => normalized);
};

describe('kolibriColorProp', () => {
	it.each([
		['#fff', { red: 255, green: 255, blue: 255 }],
		['#003c78', { red: 0, green: 60, blue: 120 }],
		['#11223344', { red: 17, green: 34, blue: 51 }],
	])('turns %s into its color channels', (value, channels) => {
		expect(applied(kolibriColorProp, value)).toEqual([channels]);
	});

	it.each([[{ backgroundColor: '#ff0000', foregroundColor: '#ffffff' }], ['{"backgroundColor":"#ff0000","foregroundColor":"#ffffff"}']])(
		'accepts the color pair %j without channels',
		(value) => {
			expect(applied(kolibriColorProp, value)).toEqual([{}]);
		},
	);

	it.each(['red', '#12', '', 3, '{"backgroundColor":"#ff0000"}'])('ignores %j', (value) => {
		expect(applied(kolibriColorProp, value)).toEqual([]);
	});

	it.each([undefined, null])('applies the default color for %s', (value) => {
		expect(applied(kolibriColorProp, value)).toEqual([{ red: 0, green: 60, blue: 120 }]);
	});
});

describe('labeledProp', () => {
	it.each([true, false])('applies %s', (value) => {
		expect(applied(labeledProp, value)).toEqual([value]);
	});

	it.each([undefined, null])('applies the default true for %s', (value) => {
		expect(applied(labeledProp, value)).toEqual([true]);
	});
});
