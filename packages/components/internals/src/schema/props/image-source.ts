import type { Generic } from 'adopted-style-sheets';

import type { WatchStringOptions } from '../utils';
import { watchString } from '../utils';

/* types */
export type ImageSourcePropType = string;

/**
 * Sets the image `src` attribute to the given string.
 */
export type PropImageSource = {
	src: ImageSourcePropType;
};

/* validator */
export const validateImageSource = (component: Generic.Element.Component, value?: ImageSourcePropType, options?: WatchStringOptions): void => {
	watchString(component, '_src', value, options);
};
