import { Generic } from '@a11y-ui/core';

import { watchBoolean } from '../../utils/prop.validators';

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
