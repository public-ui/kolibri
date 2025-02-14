import type { Generic } from 'adopted-style-sheets';

import { watchValidator } from '../../utils/prop.validators';

const ModalVariantPropTypeOptions = ['blank', 'card'] as const;
export type ModalVariantPropType = (typeof ModalVariantPropTypeOptions)[number];

/**
 * Defines the different variants for displaying the Modal.
 */
export type PropModalVariant = {
	variant: ModalVariantPropType;
};

/* validator */
export const validateModalVariant = (component: Generic.Element.Component, value?: ModalVariantPropType): void => {
	watchValidator(
		component,
		'_variant',
		(value) => typeof value === 'string' && ModalVariantPropTypeOptions.includes(value),
		new Set(ModalVariantPropTypeOptions),
		value,
	);
};
