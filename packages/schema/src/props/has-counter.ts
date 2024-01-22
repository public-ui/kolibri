import type { Generic } from 'adopted-style-sheets';

import { watchBoolean } from '../utils';

/* types */
export type HasCounterPropType = boolean;

/**
 * Shows the character count on the lower border of the input.
 */
export type PropHasCounter = {
	hasCounter: HasCounterPropType;
};

/* validator */
export const validateHasCounter = (component: Generic.Element.Component, value?: HasCounterPropType): void => {
	watchBoolean(component, '_hasCounter', value);
};
