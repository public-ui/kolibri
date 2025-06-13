/* types */
import type { Generic } from 'adopted-style-sheets';
import { watchValidator } from '../utils';

const linkVariantPropTypeOptions = ['inline', 'standalne'] as const;
export type LinkVariantPropType = (typeof linkVariantPropTypeOptions)[number];

/**
 * Defines which variant should be used for presentation.
 */
export type PropLinkVariant = {
	variant: LinkVariantPropType;
};

/* validator */
export const validateLinkVariant = (component: Generic.Element.Component, value?: LinkVariantPropType): void => {
	watchValidator(
		component,
		`_variant`,
		(value) => typeof value === 'string' && linkVariantPropTypeOptions.includes(value),
		new Set([`KoliBriLinkVariant {${linkVariantPropTypeOptions.join(', ')}`]),
		value,
		{
			defaultValue: 'inline',
		},
	);
};
