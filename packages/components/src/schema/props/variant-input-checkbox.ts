export const inputCheckboxVariantOptions = ['button', 'default', 'switch'] as const;
export type InputCheckboxVariantPropType = (typeof inputCheckboxVariantOptions)[number];

/**
 * Defines the variant for presenting the input-checkbox component.
 */
export type PropVariantInputCheckbox = {
	variant: InputCheckboxVariantPropType;
};
