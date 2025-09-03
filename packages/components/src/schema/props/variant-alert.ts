import type { Generic } from 'adopted-style-sheets';

import { watchValidator } from '../utils';

export const alertVariantOptions = ['card', 'msg'] as const;
export type AlertVariantPropType = (typeof alertVariantOptions)[number];

/**
 * Defines the variant for presenting alerts.
 */
export type PropAlertVariant = {
	variant: AlertVariantPropType;
};

const isAlertVariantPropType = (value: unknown): value is AlertVariantPropType => {
	return typeof value === 'string' && alertVariantOptions.includes(value as AlertVariantPropType);
};

export const validateAlertVariant = (component: Generic.Element.Component, value?: AlertVariantPropType): void => {
	watchValidator(component, '_variant', isAlertVariantPropType, new Set(alertVariantOptions), value);
};
