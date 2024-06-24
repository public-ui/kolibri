import type { Generic } from 'adopted-style-sheets';

import { watchValidator } from '../../utils/prop.validators';

/* types */
/**
 * Loading-Passwordner
 * - https://github.com/vineethtrv/css-loader
 */
const PasswordVariantPropTypeOptions = ['toggle', 'none'] as const;
export type PasswordVariantPropType = (typeof PasswordVariantPropTypeOptions)[number];

/**
 * Defines the variant of Password navigation.
 */
export type PropPasswordVariant = {
	variant: PasswordVariantPropType;
};

/* validator */
export const validatePasswordVariant = (component: Generic.Element.Component, value?: PasswordVariantPropType): void => {
	watchValidator(
		component,
		'_variant',
		(value) => typeof value === 'string' && PasswordVariantPropTypeOptions.includes(value),
		new Set(PasswordVariantPropTypeOptions),
		value,
	);
};
