import type { Generic } from 'adopted-style-sheets';

import { watchValidator } from '../utils';

export enum ProgressVariantEnum {
	'bar' = 'bar',
	'cycle' = 'cycle',
}

export type ProgressVariantPropType = `${ProgressVariantEnum}`;

const progressVariantOptions = Object.values(ProgressVariantEnum) as readonly ProgressVariantPropType[];

/**
 * Defines the variant for displaying the progress component.
 */
export type PropVariantProgress = {
	variant: ProgressVariantPropType;
};

export const validateVariantProgress = (component: Generic.Element.Component, value?: ProgressVariantPropType): void => {
	watchValidator(component, '_variant', (value) => typeof value === 'string' && progressVariantOptions.includes(value), new Set(progressVariantOptions), value);
};
