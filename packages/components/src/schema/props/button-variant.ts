/* types */
import type { Generic } from 'adopted-style-sheets';
import { watchValidator } from '../utils';

const buttonVariantPropTypeOptions = ['primary', 'secondary', 'normal', 'tertiary', 'danger', 'ghost', 'custom'] as const;
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
		},
	);
};
