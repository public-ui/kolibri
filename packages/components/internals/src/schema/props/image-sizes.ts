import type { Generic } from 'adopted-style-sheets';

import type { WatchStringOptions } from '../utils';
import { watchString } from '../utils';

/* types */
export type ImageSizesPropType = string;

/**
 * Defines the image sizes for different screen resolutions, supporting _srcset.
 */
export type PropImageSizes = {
	sizes: ImageSizesPropType;
};

/* validator */
export const validateImageSizes = (component: Generic.Element.Component, value?: ImageSizesPropType, options: WatchStringOptions = {}): void => {
	watchString(component, '_sizes', value, options);
};
