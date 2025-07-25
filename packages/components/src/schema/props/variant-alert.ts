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

export const validateAlertVariant = (component: Generic.Element.Component, value?: AlertVariantPropType): void => {
	watchValidator(component, '_variant', (value) => typeof value === 'string' && alertVariantOptions.includes(value), new Set(alertVariantOptions), value);
};
