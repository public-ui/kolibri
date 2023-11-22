/* types */
import { Generic } from '@a11y-ui/core';
import { watchValidator } from '../../utils/prop.validators';

const headingVariantPropTypeOptions = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong'] as const;
export type HeadingVariantPropType = (typeof headingVariantPropTypeOptions)[number];

/**
 * Defines which variant should be used for presentation.
 */
export type PropHeadingVariant = {
	variant: HeadingVariantPropType;
};

/* validator */
export const validateHeadingVariant = (component: Generic.Element.Component, value?: HeadingVariantPropType): void => {
	watchValidator(
		component,
		`_variant`,
		(value) => typeof value === 'string' && headingVariantPropTypeOptions.includes(value),
		new Set([`KoliBriHeadingVariant {${headingVariantPropTypeOptions.join(', ')}`]),
		value
	);
};
