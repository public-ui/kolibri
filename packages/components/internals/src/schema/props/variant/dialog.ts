import type { Generic } from 'adopted-style-sheets';

import { watchValidator } from '../../utils/prop.validators';

const DialogVariantPropTypeOptions = ['blank', 'card'] as const;
export type DialogVariantPropType = (typeof DialogVariantPropTypeOptions)[number];

/**
 * Defines the different variants for displaying the Dialog.
 */
export type PropDialogVariant = {
	variant: DialogVariantPropType;
};

/* validator */
export const validateDialogVariant = (component: Generic.Element.Component, value?: DialogVariantPropType): void => {
	watchValidator(
		component,
		'_variant',
		(value) => typeof value === 'string' && DialogVariantPropTypeOptions.includes(value),
		new Set(DialogVariantPropTypeOptions),
		value,
	);
};
