import { Generic } from '@a11y-ui/core';

import { watchBoolean } from '../../utils/prop.validators';

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
