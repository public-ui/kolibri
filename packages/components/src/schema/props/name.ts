import type { Generic } from 'adopted-style-sheets';

import type { WatchStringOptions } from '../utils';
import { watchString } from '../utils';

/* types */
export type NamePropType = string;

/**
 * Defines the technical name of an input field.
 */
export type PropName = {
	name: NamePropType;
};

/* validator */
export const validateName = (component: Generic.Element.Component, value?: NamePropType, options?: WatchStringOptions): void => {
	watchString(component, '_name', value, options);
};
