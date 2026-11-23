/* types */

export type ButtonVariantPropType = 'primary' | 'secondary' | 'normal' | 'tertiary' | 'danger' | 'ghost' | 'custom';

/**
 * Defines which variant should be used for presentation.
 */
export type PropButtonVariant = {
	variant: ButtonVariantPropType;
};
