import { describe, expect, it } from '@jest/globals';
import { hex } from 'wcag-contrast';

import { createContrastColorPair } from './contrast';

/**
 * WCAG 1.4.3 Contrast (Minimum), Level AA, for normal text.
 */
const MINIMUM_CONTRAST = 4.5;

const toHex = (value: number): string => value.toString(16).padStart(2, '0');

/**
 * Background colors from `#000000` to `#ffffff`, finer on the green channel, which dominates the luminance.
 */
const COLOR_GRID: string[] = [];
for (let r = 0; r <= 255; r += 51) {
	for (let g = 0; g <= 255; g += 17) {
		for (let b = 0; b <= 255; b += 51) {
			COLOR_GRID.push(`#${toHex(r)}${toHex(g)}${toHex(b)}`);
		}
	}
}

describe('createContrastColorPair', () => {
	it.each<[string, string]>([
		['#003366', '#7dcaff'],
		['#fff', '#595959'],
	])('lightens or darkens the foreground of %p to %p as the YIQ brightness suggests', (background, foreground) => {
		const pair = createContrastColorPair(background);

		expect(pair.foreground).toBe(foreground);
		expect(pair.contrast).toBeGreaterThan(7);
	});

	it.each<[string, string]>([
		['#00aa00', '#000'],
		['#0a0', '#000'],
	])('chooses the darker foreground for %p, because white stays below the contrast ratio', (background, foreground) => {
		const pair = createContrastColorPair(background);

		expect(pair.foreground).toBe(foreground);
		expect(pair.contrast).toBeGreaterThan(hex('#00aa00', '#ffffff'));
		expect(pair.contrast).toBeGreaterThanOrEqual(MINIMUM_CONTRAST);
	});

	it('replaces a given foreground that cannot reach the contrast ratio in the suggested direction', () => {
		const pair = createContrastColorPair({ background: '#00aa00', foreground: '#ffffff' });

		expect(pair.foreground).toBe('#000');
	});

	it('keeps a given foreground that already reaches the contrast ratio', () => {
		const pair = createContrastColorPair({ background: '#003366', foreground: '#ffffff' });

		expect(pair.foreground).toBe('#fff');
	});

	it('reaches at least the minimum contrast for every background color', () => {
		const tooLow = COLOR_GRID.filter((background) => createContrastColorPair(background).contrast < MINIMUM_CONTRAST);

		expect(tooLow).toEqual([]);
	});
});
