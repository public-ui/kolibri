import type { Generic } from 'adopted-style-sheets';

import type { WatchStringOptions } from '../utils';
import { watchString } from '../utils';

/* types */
export type ImagePropType = string;

/**
 * Sets the image `src` attribute to the given string.
 */
export type PropImage = {
	src: ImagePropType;
};

/* validator */
export const validateImage = (component: Generic.Element.Component, value?: ImagePropType, options?: WatchStringOptions): void => {
	watchString(component, '_image', value, options);
};
