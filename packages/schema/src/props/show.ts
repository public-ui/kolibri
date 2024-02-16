import type { Generic } from 'adopted-style-sheets';

import type { WatchBooleanOptions } from '../utils';
import { watchBoolean } from '../utils';

/* types */
export type ShowPropType = boolean;

/**
 * Makes the element show up.
 */
export type PropShow = {
	show: ShowPropType;
};

/* validator */
export const validateShow = (component: Generic.Element.Component, value?: ShowPropType, hooks?: WatchBooleanOptions): void => {
	watchBoolean(component, '_show', value, hooks);
};
