import type { ColorPair } from '../../schema';
import { createContrastColorPair } from '../../schema';
import { createPropDefinition, type Prop } from './helpers/factory';

/**
 * Color prop for foreground/background color pairs
 *
 * Description:
 * Defines a color pair consisting of a foreground (text) and background color. Both colors
 * must be provided as valid hex values. The component automatically calculates contrast-safe
 * color pairs to ensure readability.
 *
 * Usage (according to WCAG 2.1):
 * - Single hex value: color="#003366" (background; foreground is auto-calculated for contrast)
 * - Color pair object: color={ backgroundColor: "#003366", foregroundColor: "#ffffff" }
 * - All color combinations must meet WCAG contrast requirements:
 *   - Normal text: minimum contrast ratio 4.5:1 (WCAG 1.4.3 Contrast Minimum, Level AA)
 *   - Large text (≥18pt or ≥14pt bold): minimum contrast ratio 3:1
 *   - Enhanced: minimum contrast ratio 7:1 for normal text (WCAG 1.4.6 Contrast Enhanced, Level AAA)
 * - Non-text elements (icons, borders) require a minimum contrast ratio of 3:1 (WCAG 1.4.11 Non-text Contrast)
 * - Color must not be the only means of conveying information (WCAG 1.4.1 Use of Color)
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
 * @see https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced.html
 * @see https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html
 * @see https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html
 */
const HEX_REGEX = /^#((\d|[a-f]){8}|(\d|[a-f]){6}|(\d|[a-f]){3,4})$/i;
function isHexString(value: string): boolean {
	return HEX_REGEX.test(value);
}

function normalizer(value: unknown): ColorPair {
	if (typeof value === 'string' && isHexString(value)) {
		const colors = createContrastColorPair(value);
		return {
			backgroundColor: colors.background,
			foregroundColor: colors.foreground,
		};
	} else if (typeof value === 'object' && value) {
		const colorPair = value as ColorPair;
		if (
			typeof colorPair.backgroundColor === 'string' &&
			typeof colorPair.foregroundColor === 'string' &&
			isHexString(colorPair.backgroundColor) &&
			isHexString(colorPair.foregroundColor)
		) {
			const colors = createContrastColorPair({
				background: colorPair.backgroundColor,
				foreground: colorPair.foregroundColor,
			});
			return {
				backgroundColor: colors.background,
				foregroundColor: colors.foreground,
			};
		}
	}
	throw new Error(`Invalid color ${value as string}`);
}

function validator(value: ColorPair) {
	return isHexString(value.foregroundColor) && isHexString(value.backgroundColor);
}

export type ColorProp = Prop<'color', ColorPair | string, ColorPair>;
export const colorProp = createPropDefinition<ColorProp>(
	'color',
	{
		backgroundColor: '#d3d3d3',
		foregroundColor: '#3f3f3f',
	},
	normalizer,
	validator,
);
