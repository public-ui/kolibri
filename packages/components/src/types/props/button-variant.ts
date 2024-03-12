/* types */
import type { Generic } from 'adopted-style-sheets';
import { watchValidator } from '../../utils/prop.validators';

export type ButtonVariantPropType = 'primary' | 'secondary' | 'normal' | 'tertiary' | 'danger' | 'ghost' | 'custom';

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
		(value) => value === 'primary' || value === 'secondary' || value === 'normal' || value === 'danger' || value === 'ghost' || value === 'custom',
		new Set(['KoliBriButtonVariant {primary, secondary, normal, danger, ghost, custom}']),
		value,
		{
			defaultValue: 'normal',
		},
	);
};
