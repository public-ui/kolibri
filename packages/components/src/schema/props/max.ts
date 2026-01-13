import type { Generic } from 'adopted-style-sheets';

import type { WatchNumberOptions } from '../utils';
import { watchNumber } from '../utils';

import type { RowsPropType } from './rows';

/* types */
export type MaxPropType = number;

/**
 * Defines the maximum value of the element.
 */
export type PropMax = {
	max: MaxPropType;
};

/* validator */
export const validateMax = (component: Generic.Element.Component, value?: RowsPropType, options?: WatchNumberOptions): void => {
	watchNumber(component, '_max', value, options);
};
