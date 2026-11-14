import type { Generic } from 'adopted-style-sheets';

import type { WatchBooleanOptions } from '../utils';
import { watchBoolean } from '../utils';

/* types */
export type OpenPropType = boolean;

/**
 * Opens/expands the element when truthy, closes/collapses when falsy.
 */
export type PropOpen = {
	open: OpenPropType;
};

/* validator */
export const validateOpen = (component: Generic.Element.Component, value: OpenPropType | undefined, options?: WatchBooleanOptions): void => {
	watchBoolean(component, '_open', value, options);
};
