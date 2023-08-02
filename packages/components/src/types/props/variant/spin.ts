import { Generic } from '@a11y-ui/core';

import { watchValidator } from '../../../utils/prop.validators';

/* types */
/**
 * Loading-spinner
 * - https://github.com/vineethtrv/css-loader
 */
export type SpinVariantPropType = 'cycle' | 'dot' | 'none';

/**
 * Defines the variant of spin navigation
 */
export type PropSpinVariant = {
	variant: SpinVariantPropType;
};

/* validator */
export const validateSpinVariant = (component: Generic.Element.Component, value?: SpinVariantPropType): void => {
	watchValidator(component, '_variant', (value) => value === 'cycle' || value === 'dot' || value === 'none', new Set(['cycle', 'dot', 'none']), value);
};
