import type { Generic } from 'adopted-style-sheets';

import type { WatchStringOptions } from '../utils';
import { watchString } from '../utils';

/* types */
export type ImageSrcsetPropType = string;

/* validator */
export const validateImageSrcset = (component: Generic.Element.Component, value?: ImageSrcsetPropType, options: WatchStringOptions = {}): void => {
	watchString(component, '_srcset', value, options);
};
