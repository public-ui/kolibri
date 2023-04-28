import { Generic } from '@a11y-ui/core';
import { WatchOptions, watchValidator } from '../../utils/prop.validators';
import { Stringified } from '../common';
import { ColorContrast, createContrastColorPair } from '../../components/badge/contrast';
import { a11yHint } from '../../utils/a11y.tipps';

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

type typeOfColorType = 'string' | 'ColorPair' | 'DeprecatedColorPair' | null;

const HEX_REGEX = /^#(\d|[a-f]){3}(\d|[a-f]){6}$/;
function isHexString(value: string): boolean {
	return HEX_REGEX.test(value);
}
/* checks if the string is valid JSON and if the resulting object is a valid ColorPair or DeprecatedColorPair and returns it, or null if invalid. */
function isColorObjectString(value: string): { type: typeOfColorType; value: PropColor | null } {
	if (value.startsWith('{')) {
		try {
			const parsed = JSON.parse(value) as unknown;
			if (colorPairValidator(parsed as ColorPair)) return { type: 'ColorPair', value: parsed as ColorPair };
			if (deprecatedColorPairValidator(parsed as DeprecatedColorPair)) return { type: 'DeprecatedColorPair', value: parsed as DeprecatedColorPair };
		} catch (error) {
			return { type: null, value: null };
		}
	}
	return { type: null, value: null };
}

function typeOfColor(value?: unknown): { type: typeOfColorType; valid: boolean; value: PropColor | string } {
	if (value) {
		if (typeof value === 'string') {
			if (isHexString(value)) return { type: 'string', valid: true, value: value };
			else {
				const colorObject = isColorObjectString(value);
				if (colorObject.value) return { type: colorObject.type, valid: true, value: colorObject.value };
			}
		} else {
			const asColorPair = value as ColorPair;
			if (colorPairValidator(asColorPair)) return { type: 'ColorPair', valid: true, value: asColorPair };
			const asDeprecatedColorPair = value as DeprecatedColorPair;
			if (deprecatedColorPairValidator(asDeprecatedColorPair)) return { type: 'DeprecatedColorPair', valid: true, value: asDeprecatedColorPair };
		}
	}
	return { type: null, valid: false, value: '' };
}

/* validate different color options */
function colorPairValidator(value: ColorPair): boolean {
	return (
		typeof value === 'object' &&
		value &&
		typeof value.backgroundColor === 'string' &&
		(typeof value.foregroundColor === 'string' ||
			(value.foregroundColor &&
				typeof value.foregroundColor.primary === 'string' &&
				typeof value.foregroundColor.secondary === 'string' &&
				typeof value.foregroundColor.neutral === 'string'))
	);
}
function deprecatedColorPairValidator(value: DeprecatedColorPair): boolean {
	return typeof value === 'object' && value && typeof value.backgroundColor === 'string' && typeof value.color === 'string';
}

function validatorFunction(value?: Stringified<PropColor>): boolean {
	const valueType = typeOfColor(value);
	switch (valueType.type) {
		case null:
			return false;
		case 'string':
		case 'ColorPair':
		case 'DeprecatedColorPair':
			return valueType.valid;
	}
}

/* validator */
export const validateColor = (component: Generic.Element.Component, value?: Stringified<PropColor>, options?: WatchOptions): void => {
	watchValidator(component, '_color', validatorFunction, new Set(['rgb in hex', 'ColorPair']), value, options);
};

export const handleColorChange = (value: unknown): ColorPair => {
	let colorContrast: ColorContrast<string>;
	const valueType = typeOfColor(value);
	switch (valueType.type) {
		case 'string':
			colorContrast = createContrastColorPair(valueType.value as string);
			break;
		case 'ColorPair':
		case 'DeprecatedColorPair': {
			const asColorPair = valueType.value as ColorPair;
			const asDeprecatedColorPair = valueType.value as DeprecatedColorPair;
			let foreground = '';
			if (typeof asColorPair.foregroundColor === 'string') foreground = asColorPair.foregroundColor;
			else if (asColorPair.foregroundColor.primary) foreground = asColorPair.foregroundColor.primary;
			else if (typeof asDeprecatedColorPair.color === 'string') foreground = asDeprecatedColorPair.color;

			colorContrast = createContrastColorPair({
				background: asColorPair.backgroundColor,
				foreground,
			});
			break;
		}
		case null:
			// should not happen, because validatorFunction() is called before.
			throw new Error('_color was an unexpected value.');
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
