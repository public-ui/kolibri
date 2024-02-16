import type { RGB } from 'color-convert/conversions';
import { hex } from 'wcag-contrast';

import { colorRgba } from './color-rgba';
import { rgbaConvert } from './rgba-convert';

type RGBA = [number, number, number, number];

// const calcColor = (color: RGBA, diff: number): RGBA => [
//   Math.max(Math.min(Math.round(color[0] + (color[0] / 100 + 1) * diff), 255), 0),
//   Math.max(Math.min(Math.round(color[1] + (color[1] / 100 + 1) * diff), 255), 0),
//   Math.max(Math.min(Math.round(color[2] + (color[2] / 100 + 1) * diff), 255), 0),
//   color[3],
// ];

// const relativeLuminanceFormel = (c: number): number => {
//   if (c <= 0.03928) {
//     return c / 12.92;
//   } else {
//     return ((c + 0.055) / 1.055) ** 2.4;
//   }
// };
// // https://www.w3.org/TR/WCAG20/#contrast-ratiodef
// const relativeLuminance = (r: number, g: number, b: number): number => {
//   return (
//     0.2126 * relativeLuminanceFormel(r) + 0.7152 * relativeLuminanceFormel(g) + 0.0722 * relativeLuminanceFormel(b)
//   );
// };

// https://css-tricks.com/snippets/javascript/random-hex-color/
// const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

// https://24ways.org/2010/calculating-color-contrast/
// ts-prune-ignore-next
export const getContrastYIQ = (r: number, g: number, b: number): number => {
	const yiq = (r * 299 + g * 587 + b * 114) / 1000;
	return yiq >= 128 ? -1 : 1;
};

type ColorPair<T> = {
	background: T;
	foreground: T;
};

export type ColorContrast<T> = ColorPair<T> & {
	contrast: number;
};

// ts-prune-ignore-next
export const calcColorContrast = (baseColor: RGB, contrastColor: RGB, ratio: number, dir = 1): ColorContrast<RGB> => {
	const color: RGB = [
		Math.max(Math.min(Math.round(contrastColor[0] + dir * Math.max(1, contrastColor[0] / 100)), 255), 0),
		Math.max(Math.min(Math.round(contrastColor[1] + dir * Math.max(1, contrastColor[1] / 100)), 255), 0),
		Math.max(Math.min(Math.round(contrastColor[2] + dir * Math.max(1, contrastColor[2] / 100)), 255), 0),
	];
	const contrast = hex(rgbaConvert.hex(`rgba(${baseColor.join(',')},1)`), rgbaConvert.hex(`rgba(${color.join(',')},1)`));
	const summe = color[0] + color[1] + color[2];
	if (summe === 0 || summe === 765 || contrast > ratio) {
		return {
			background: baseColor,
			foreground: color,
			contrast,
		};
	} else {
		return calcColorContrast(baseColor, color, ratio, dir);
	}
};

const cache: Map<unknown, ColorContrast<RGB>> = new Map();

// ts-prune-ignore-next
export const getColorContrast = (baseColor: RGB, contrastColor: RGB, ratio: number, dir = 1): ColorContrast<RGB> => {
	if (cache.has(baseColor)) {
		return cache.get(baseColor) as ColorContrast<RGB>;
	}
	const color = calcColorContrast(baseColor, contrastColor, ratio, dir);
	cache.set(baseColor, color);
	return color;
};

export const createContrastColorPair = (color: string | ColorPair<string>, contrastRatio = 7): ColorContrast<string> => {
	let baseColor: RGBA = [0, 0, 0, 1];
	let contrastColor: RGBA = [255, 255, 255, 1];
	if (typeof color === 'string') {
		baseColor = colorRgba(color);
		contrastColor = baseColor;
	} else if (typeof color === 'object' && color !== null && typeof color.background === 'string' && typeof color.foreground === 'string') {
		baseColor = colorRgba(color.background);
		if (typeof color.foreground === 'string') {
			contrastColor = colorRgba(color.foreground);
		} else {
			contrastColor = baseColor;
		}
	}
	const yiq = getContrastYIQ(baseColor[0], baseColor[1], baseColor[2]);
	const colorContrast = getColorContrast(
		[baseColor[0], baseColor[1], baseColor[2]],
		[contrastColor[0], contrastColor[1], contrastColor[2]],
		contrastRatio,
		yiq,
	);
	contrastColor = [...colorContrast.foreground, 1];

	return {
		background: rgbaConvert.hex(`rgba(${baseColor.join(',')})`),
		foreground: rgbaConvert.hex(`rgba(${contrastColor.join(',')})`),
		contrast: colorContrast.contrast,
	};
};
