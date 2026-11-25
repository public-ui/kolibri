export const alertTypeOptions = ['default', 'info', 'success', 'warning', 'error'] as const;
export type AlertType = (typeof alertTypeOptions)[number];

export type AlertTypePropType = AlertType;

/**
 * Defines the type of the alert component.
 */
export type PropAlertType = {
	type: AlertTypePropType;
};
