import type { Generic } from 'adopted-style-sheets';

import { watchValidator } from '../utils';

/* types */
export type ImagePropType = {
	uri: string;
	alt: string;
};

/**
 * Holds the image's `src` and 'alt' attributes.
 */
export type PropImage = {
	image: ImagePropType;
};

/* validator */
export const validateImage = (component: Generic.Element.Component, value?: ImagePropType): void => {
	watchValidator(
		component,
		`_image`,
		(value) => typeof value?.uri === 'string' && value.uri.length > 0 && typeof value?.alt === 'string' && value.alt.length > 0,
		new Set<string>(),
		value,
	);
};
