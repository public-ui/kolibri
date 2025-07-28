import type { Generic } from 'adopted-style-sheets';

import { watchValidator } from '../utils';

export const alertTypeOptions = ['default', 'info', 'success', 'warning', 'error'] as const;
export type AlertType = (typeof alertTypeOptions)[number];

export type AlertTypePropType = AlertType;

/**
 * Defines the type of the alert component.
 */
export type PropAlertType = {
	type: AlertTypePropType;
};

export const validateAlertType = (component: Generic.Element.Component, value?: AlertTypePropType): void => {
	watchValidator(component, '_type', (value) => typeof value === 'string' && alertTypeOptions.includes(value), new Set(alertTypeOptions), value);
};
