import { Generic } from '@a11y-ui/core';

import { watchString, WatchStringOptions } from '../../utils/prop.validators';

/* types */
/**
 * Sets the image `src` attribute to the given string
 */
export type ImageSourcePropType = string;

/* validator */
export const validateImageSource = (component: Generic.Element.Component, value?: ImageSourcePropType, options?: WatchStringOptions): void => {
	watchString(component, '_src', value, options);
};
