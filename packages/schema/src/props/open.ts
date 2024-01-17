import type { Generic } from 'adopted-style-sheets';

import type { WatchBooleanOptions } from '../utils';
import { watchBoolean } from '../utils';

/* types */
export type OpenPropType = boolean;

/**
 * If set (to true) opens/expands the element, closes if not set (or set to false).
 */
export type PropOpen = {
	open: OpenPropType;
};

/* validator */
export const validateOpen = (component: Generic.Element.Component, value: OpenPropType | undefined, options?: WatchBooleanOptions): void => {
	watchBoolean(component, '_open', value, options);
};
