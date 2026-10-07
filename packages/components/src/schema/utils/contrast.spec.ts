import { describe, expect, it } from '@jest/globals';
import type { RGB } from 'color-convert';
import { hex } from 'wcag-contrast';

import { calcColorContrast, createContrastColorPair, getColorContrast } from './contrast';

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

	it('returns the same result for repeated calls with the same color', () => {
		expect(createContrastColorPair('#bec5c9')).toEqual(createContrastColorPair('#bec5c9'));
	});
});

describe('getColorContrast', () => {
	it('returns the result of calcColorContrast', () => {
		expect(getColorContrast([255, 255, 255], [255, 255, 255], 7, -1)).toEqual(calcColorContrast([255, 255, 255], [255, 255, 255], 7, -1));
	});

	it('uses 1 as the default direction', () => {
		expect(getColorContrast([0, 0, 0], [0, 0, 0], 7)).toEqual(getColorContrast([0, 0, 0], [0, 0, 0], 7, 1));
	});

	/*
	 * Every call reuses the same `baseColor` array instance, so a result that depends on the identity of
	 * `baseColor` alone would repeat the result of the first call.
	 */
	describe('with the same baseColor instance', () => {
		it('takes the contrastColor into account', () => {
			const baseColor: RGB = [255, 255, 255];

			const grey = getColorContrast(baseColor, [255, 255, 255], 7, -1);
			const red = getColorContrast(baseColor, [255, 0, 0], 7, -1);

			expect(grey.foreground[0]).toBe(grey.foreground[1]);
			expect(red.foreground[1]).toBe(0);
			expect(red.foreground[2]).toBe(0);
			expect(red).toEqual(calcColorContrast([255, 255, 255], [255, 0, 0], 7, -1));
		});

		it('takes the ratio into account', () => {
			const baseColor: RGB = [255, 255, 255];

			const high = getColorContrast(baseColor, [255, 255, 255], 7, -1);
			const low = getColorContrast(baseColor, [255, 255, 255], 3, -1);

			expect(high.contrast).toBeGreaterThan(7);
			expect(low.contrast).toBeGreaterThan(3);
			expect(low.contrast).toBeLessThan(high.contrast);
			expect(low.foreground[0]).toBeGreaterThan(high.foreground[0]);
		});

		it('takes the direction into account', () => {
			const baseColor: RGB = [128, 128, 128];

			const lighter = getColorContrast(baseColor, [128, 128, 128], 3, 1);
			const darker = getColorContrast(baseColor, [128, 128, 128], 3, -1);

			expect(lighter.foreground[0]).toBeGreaterThan(128);
			expect(darker.foreground[0]).toBeLessThan(128);
		});

		it('returns a result that later calls do not share', () => {
			const baseColor: RGB = [255, 255, 255];

			const first = getColorContrast(baseColor, [255, 255, 255], 7, -1);
			const expected = { ...first, foreground: [...first.foreground] };
			first.foreground[0] = 0;
			first.contrast = 0;

			expect(getColorContrast(baseColor, [255, 255, 255], 7, -1)).toEqual(expected);
		});
	});
});
