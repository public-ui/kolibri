import { Generic } from 'adopted-style-sheets';

import { watchString, WatchStringOptions } from '../../utils/prop.validators';

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
