import { Generic } from '@a11y-ui/core';

import { watchBoolean } from '../../utils/prop.validators';

/* types */
export type AlertPropType = boolean;

/**
 * Makes hints readable for screen-readers.
 */
export type PropAlert = {
	alert: AlertPropType;
};

/* validator */
export const validateAlert = (component: Generic.Element.Component, value?: AlertPropType): void => {
	watchBoolean(component, '_alert', value);
};
