import type { Generic } from 'adopted-style-sheets';

import { watchValidator } from '../utils';

const progressVariantOptions = ['bar', 'cycle'] as const;
export type ProgressVariantPropType = (typeof progressVariantOptions)[number];

const isProgressVariantPropType = (value: unknown): value is ProgressVariantPropType => {
	return typeof value === 'string' && progressVariantOptions.includes(value as ProgressVariantPropType);
};

export const validateVariantProgress = (component: Generic.Element.Component, value?: ProgressVariantPropType): void => {
	watchValidator(component, '_variant', isProgressVariantPropType, new Set(progressVariantOptions), value);
};
