/* types */
import { Generic } from '@a11y-ui/core';
import { watchValidator } from '../../utils/prop.validators';

export const buttonVariantPropTypeOptions = ['primary', 'secondary', 'normal', 'tertiary', 'danger', 'ghost', 'custom'] as const;
export type ButtonVariantPropType = (typeof buttonVariantPropTypeOptions)[number];

/**
 * Defines which variant should be used for presentation.
 */
export type PropButtonVariant = {
	variant: ButtonVariantPropType;
};

/* validator */
export const validateButtonVariant = (component: Generic.Element.Component, value?: ButtonVariantPropType): void => {
	watchValidator(
		component,
		`_variant`,
		(value) => typeof value === 'string' && buttonVariantPropTypeOptions.includes(value),
		new Set([`KoliBriButtonVariant {${buttonVariantPropTypeOptions.join(', ')}`]),
		value,
		{
			defaultValue: 'normal',
		}
	);
};
