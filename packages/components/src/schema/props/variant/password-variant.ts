import type { Generic } from 'adopted-style-sheets';

import { watchValidator } from '../../utils/prop.validators';

const PasswordVariantPropTypeOptions = ['default', 'visibility-toggle'] as const;
export type PasswordVariantPropType = (typeof PasswordVariantPropTypeOptions)[number];

/**
 * Defines the different variants for displaying the password input.
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
