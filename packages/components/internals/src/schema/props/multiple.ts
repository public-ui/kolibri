import type { Generic } from 'adopted-style-sheets';

import type { WatchBooleanOptions } from '../utils';
import { watchBoolean } from '../utils';

/* types */
export type MultiplePropType = boolean;

/**
 * Makes the input accept multiple inputs.
 */
export type PropMultiple = {
	multiple: MultiplePropType;
};

/* validator */
export const validateMultiple = (component: Generic.Element.Component, value?: MultiplePropType, options?: WatchBooleanOptions): void => {
	watchBoolean(component, '_multiple', value, options);
};
