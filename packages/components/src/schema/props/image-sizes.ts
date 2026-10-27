import type { Generic } from 'adopted-style-sheets';

import type { WatchStringOptions } from '../utils';
import { watchString } from '../utils';

/* types */
export type ImageSizesPropType = string;

/* validator */
export const validateImageSizes = (component: Generic.Element.Component, value?: ImageSizesPropType, options: WatchStringOptions = {}): void => {
	watchString(component, '_sizes', value, options);
};
