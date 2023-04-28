import { Generic } from '@a11y-ui/core';
import { WatchOptions, watchValidator } from '../../utils/prop.validators';
import { Stringified } from '../common';
import { ColorContrast, createContrastColorPair } from '../../components/badge/contrast';
import { a11yHint, devHint } from '../../utils/a11y.tipps';

/* types */
type CharacteristicColors = {
	primary: string;
	secondary: string;
	neutral: string;
};

export type ColorPair = {
	backgroundColor: string;
	foregroundColor: Stringified<CharacteristicColors>;
};

/**
 * @deprecated
 */
type DeprecatedColorPair = {
	backgroundColor: string;
	/**
	 * @deprecated Please use `foregroundColor` instead of `color`.
	 */
	color: string;
};

export type PropColor = ColorPair | DeprecatedColorPair;

function validatorFunction(value?: Stringified<PropColor>): boolean {
	const isString = typeof value === 'string';

	const asColorPair = value as ColorPair;
	const isColorPair =
		typeof asColorPair === 'object' &&
		asColorPair &&
		typeof asColorPair.backgroundColor === 'string' &&
		(typeof asColorPair.foregroundColor === 'string' ||
			(asColorPair.foregroundColor &&
				typeof asColorPair.foregroundColor.primary === 'string' &&
				typeof asColorPair.foregroundColor.secondary === 'string' &&
				typeof asColorPair.foregroundColor.neutral === 'string'));

	const asDeprecatedColorPair = value as DeprecatedColorPair;
	const isDeeprecatedColorPair =
		typeof asDeprecatedColorPair === 'object' &&
		asDeprecatedColorPair !== null &&
		typeof asDeprecatedColorPair.backgroundColor === 'string' &&
		typeof asDeprecatedColorPair.color === 'string';

	return isString || isColorPair || isDeeprecatedColorPair;
}

/* validator */
export const validateColor = (component: Generic.Element.Component, value?: Stringified<PropColor>, options?: WatchOptions): void => {
	watchValidator(component, '_color', validatorFunction, new Set(['PropColor']), value, options);
};

const HACK_REG_EX = /^([a-f0-9]{3}|[a-f0-9]{6})$/;

export const handleColorChange = (value: unknown): ColorPair => {
	let asString = value as string;
	const asColorPair = value as ColorPair;
	const asDeprecatedColorPair = value as DeprecatedColorPair;
	let colorContrast: ColorContrast<string>;
	if (typeof asString === 'string') {
		if (HACK_REG_EX.test(asString)) {
			// Catch Breaking Change - remove next Major
			devHint(`[Color] Bitte verwenden Sie zukünftig nur noch das Standard-Farbformat für CSS (https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).`);
			asString = `#${asString}`;
		}
		colorContrast = createContrastColorPair(asString);
	} else if (typeof asColorPair.foregroundColor === 'string') {
		colorContrast = createContrastColorPair({
			background: asColorPair.backgroundColor,
			foreground: asColorPair.foregroundColor,
		});
	} else if (typeof asDeprecatedColorPair.color === 'string') {
		colorContrast = createContrastColorPair({
			background: asDeprecatedColorPair.backgroundColor,
			foreground: asDeprecatedColorPair.color,
		});
		devHint(`[KolBadge] The property \`color\` of PropColor is deprecated. Please us \`foreground\` instead.`);
	} else {
		colorContrast = createContrastColorPair({
			background: asColorPair.backgroundColor,
			foreground: asColorPair.foregroundColor.primary,
		});
		devHint(`[KolBadge] You used the color schema with characteristic colors (primary, secondary, neutral). For the badge use only the primary color.`);
	}
	if (colorContrast.contrast < 7) {
		a11yHint(
			`[KolBadge] The contrast of ${colorContrast.contrast} (≥7, AAA) is too low, between the color pair ${colorContrast.background} and ${colorContrast.foreground}.`
		);
	}
	return {
		backgroundColor: colorContrast.background,
		foregroundColor: colorContrast.foreground,
	};
};
