import { Generic } from 'adopted-style-sheets';

import { watchBoolean } from '../../utils/prop.validators';

/* types */
export type AlertPropType = boolean;

/**
 * Defines whether the screen-readers should read out the notification.
 */
export type PropAlert = {
	alert: AlertPropType;
};

/* validator */
export const validateAlert = (component: Generic.Element.Component, value?: AlertPropType): void => {
	watchBoolean(component, '_alert', value);
};
