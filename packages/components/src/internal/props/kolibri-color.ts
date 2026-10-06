import rgba from 'color-rgba';

import type { ColorPair, PropColor, Stringified } from '../../schema';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/** The color channels of the KoliBri logo. */
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

/** Throws for a color that `color-rgba` cannot parse. */
const toChannels = (color: string): KolibriColor => {
	const channels = rgba(color);
	if (!Array.isArray(channels) || channels.length < 3) {
		throw new Error(`Invalid KoliBri color: ${color}`);
	}
	const [red, green, blue] = channels;
	return { red, green, blue };
};

/**
 * Color of `kol-kolibri`: a hex string (3, 4, 6 or 8 digits) becomes its color channels. Of a color
 * pair (as object or as JSON), the logo takes the `foregroundColor`; a pair whose `foregroundColor` is
 * no valid color is rejected.
 */
export const kolibriColorProp = createPropDefinition<KolibriColorProp>('color', toChannels('#003c78'), (value: unknown) => {
	if (typeof value === 'string' && HEX_REGEX.test(value)) {
		return toChannels(value);
	}
	const pair = isColorPair(value) ? value : typeof value === 'string' ? parseColorPair(value) : undefined;
	if (pair) {
		return toChannels(pair.foregroundColor);
	}
	throw new Error('Invalid KoliBri color: expected a hex string or a color pair.');
});
