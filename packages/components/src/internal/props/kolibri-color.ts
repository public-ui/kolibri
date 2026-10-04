import rgba from 'color-rgba';

import type { ColorPair, PropColor, Stringified } from '../../schema';
import { devHint } from '../../schema';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/** The color channels of the KoliBri logo; a color pair leaves them empty. */
export type KolibriColor = { red?: number; green?: number; blue?: number };

export type KolibriColorProp = Prop<'color', Stringified<PropColor>, KolibriColor>;

const HEX_REGEX = /^#((\d|[a-f]){8}|(\d|[a-f]){6}|(\d|[a-f]){3,4})$/i;

const isColorPair = (value: unknown): value is ColorPair =>
	typeof value === 'object' &&
	value !== null &&
	typeof (value as ColorPair).backgroundColor === 'string' &&
	typeof (value as ColorPair).foregroundColor === 'string';

const parseColorPair = (value: string): ColorPair | undefined => {
	if (value.startsWith('{')) {
		try {
			const parsed = JSON.parse(value) as unknown;
			return isColorPair(parsed) ? parsed : undefined;
		} catch {
			return undefined;
		}
	}
	return undefined;
};

const toChannels = (hex: string): KolibriColor => {
	const [red, green, blue] = rgba(hex);
	return { red, green, blue };
};

/**
 * Color of `kol-kolibri`: a hex string (3, 4, 6 or 8 digits) becomes its color channels. A color pair
 * (as object, with a hint, or as JSON) is accepted but cannot color the logo: it leaves the channels
 * empty, so the logo renders `rgb(undefined,undefined,undefined)`.
 */
export const kolibriColorProp = createPropDefinition<KolibriColorProp>('color', toChannels('#003c78'), (value: unknown) => {
	if (typeof value === 'string' && HEX_REGEX.test(value)) {
		return toChannels(value);
	}
	if (isColorPair(value)) {
		devHint(`[KolKolibri] You used the complex color schema. For the KoliBri we use need the color as hex string.`);
		return {};
	}
	if (typeof value === 'string' && parseColorPair(value)) {
		return {};
	}
	throw new Error('Invalid KoliBri color: expected a hex string or a color pair.');
});
