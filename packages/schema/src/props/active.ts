import type { Generic } from 'adopted-style-sheets';

import type { WatchBooleanOptions } from '../utils';
import { watchBoolean } from '../utils';

/* types */
export type ActivePropType = boolean;

/**
 * Defines whether something is active.
 */
export type PropActive = {
	active: ActivePropType;
};

/* validator */
export const validateActive = (component: Generic.Element.Component, value: ActivePropType, options?: WatchBooleanOptions): void => {
	watchBoolean(component, '_active', value, options);
};
