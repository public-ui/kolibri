import type { Generic } from 'adopted-style-sheets';

import { watchBoolean } from '../utils';

/* types */
export type TouchedPropType = boolean;

/**
 * Shows if the input was touched by a user.
 */
export type PropTouched = {
	touched: TouchedPropType;
};

/* validator */
export const validateTouched = (component: Generic.Element.Component, value?: TouchedPropType): void => {
	watchBoolean(component, '_touched', value);
};
