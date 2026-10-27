import type { Generic } from 'adopted-style-sheets';

import type { WatchBooleanOptions } from '../utils';
import { watchBoolean } from '../utils';

/* types */
export type AllowMultiSortPropType = boolean;

/* validator */
export const validateAllowMultiSort = (component: Generic.Element.Component, value?: AllowMultiSortPropType, options: WatchBooleanOptions = {}): void => {
	watchBoolean(component, '_allowMultiSort', value, { defaultValue: false, ...options });
};
