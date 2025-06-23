import type { Generic } from 'adopted-style-sheets';

import type { WatchStringOptions } from '../utils';
import { watchString } from '../utils';

/* types */
export type AltPropType = string;

/**
 * Sets the alternative text of the image.
 */
export type PropAlt = {
	alt: AltPropType;
};

/* validator */
export const validateAlt = (component: Generic.Element.Component, value?: AltPropType, options: WatchStringOptions = {}): void => {
	watchString(component, '_alt', value, options);
};
