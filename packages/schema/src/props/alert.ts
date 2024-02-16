import type { Generic } from 'adopted-style-sheets';

import { watchBoolean } from '../utils';

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
