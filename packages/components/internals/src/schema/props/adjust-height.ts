import type { Generic } from 'adopted-style-sheets';

import { watchBoolean } from '../utils';

/* types */
export type AdjustHeightPropType = boolean;

/**
 * Adjusts the height of the element to its content.
 */
export type PropAdjustHeight = {
	adjustHeight: AdjustHeightPropType;
};

/* validator */
export const validateAdjustHeight = (component: Generic.Element.Component, value?: AdjustHeightPropType): void => {
	watchBoolean(component, '_adjustHeight', value);
};
