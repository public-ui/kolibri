import type { Generic } from 'adopted-style-sheets';

import { watchValidator } from '../utils';

export const progressVariantOptions = ['bar', 'cycle'] as const;
export type ProgressVariantPropType = (typeof progressVariantOptions)[number];

/**
 * Defines the variant for displaying the progress component.
 */
export type PropVariantProgress = {
	variant: ProgressVariantPropType;
};

export const validateVariantProgress = (component: Generic.Element.Component, value?: ProgressVariantPropType): void => {
	watchValidator(component, '_variant', (value) => typeof value === 'string' && progressVariantOptions.includes(value), new Set(progressVariantOptions), value);
};
