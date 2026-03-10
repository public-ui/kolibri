import type { ColorPair } from '../../schema';
import { createContrastColorPair } from '../../schema';
import { createPropDefinition, type Prop } from './helpers/factory';

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
export const colorProp = createPropDefinition<ColorProp>(normalizer, validator, {
	backgroundColor: '#d3d3d3',
	foregroundColor: '#3f3f3f',
});
