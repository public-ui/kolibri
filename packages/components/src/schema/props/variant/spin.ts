import type { Generic } from 'adopted-style-sheets';

import { watchValidator } from '../../utils/prop.validators';

/* types */
/**
 * Loading-spinner
 * - https://github.com/vineethtrv/css-loader
 */
const spinVariantPropTypeOptions = ['cycle', 'dot', 'none'] as const;
export type SpinVariantPropType = (typeof spinVariantPropTypeOptions)[number];

/**
 * Defines the variant of spin navigation.
 */
export type PropSpinVariant = {
	variant: SpinVariantPropType;
};

/* validator */
export const validateSpinVariant = (component: Generic.Element.Component, value?: SpinVariantPropType): void => {
	watchValidator(
		component,
		'_variant',
		(value) => typeof value === 'string' && spinVariantPropTypeOptions.includes(value),
		new Set(spinVariantPropTypeOptions),
		value,
	);
};
