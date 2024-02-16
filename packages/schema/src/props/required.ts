import type { Generic } from 'adopted-style-sheets';

import { watchBoolean } from '../utils';

/* types */
type RequiredPropType = boolean;

/**
 * Makes the input element required.
 */
export type PropRequired = {
	required: RequiredPropType;
};

/* validator */
export const validateRequired = (component: Generic.Element.Component, value?: RequiredPropType): void => {
	watchBoolean(component, '_required', value);
};
