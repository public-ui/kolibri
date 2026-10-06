import { describe, expect, it } from '@jest/globals';
import type { RGB } from 'color-convert';

import { calcColorContrast, createContrastColorPair, getColorContrast } from './contrast';

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

describe('createContrastColorPair', () => {
	it('derives a foreground with a contrast ratio above 7 from a single color', () => {
		const pair = createContrastColorPair('#ffffff');

		expect(pair.background).toBe('#fff');
		expect(pair.foreground).not.toBe(pair.background);
		expect(pair.contrast).toBeGreaterThan(7);
	});

	it('returns the same result for repeated calls with the same color', () => {
		expect(createContrastColorPair('#bec5c9')).toEqual(createContrastColorPair('#bec5c9'));
	});

	it('derives different foregrounds for one background with different foreground colors', () => {
		const grey = createContrastColorPair({ background: '#ffffff', foreground: '#ffffff' });
		const red = createContrastColorPair({ background: '#ffffff', foreground: '#ff0000' });

		expect(grey.background).toBe(red.background);
		expect(grey.foreground).not.toBe(red.foreground);
	});
});
