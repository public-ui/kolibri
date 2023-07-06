import { Generic } from '@a11y-ui/core';

import { watchValidator } from '../../../utils/prop.validators';

/* types */
/**
 * Loadingspinner
 * - https://github.com/vineethtrv/css-loader
 */
export type SpinVariant = 'cycle' | 'dot' | 'none';

/** de
 * Macht die Fehlermeldung dieses Elements von Screenreadern lesbar.
 */
/** en
 * Makes hints readable for screenreaders.
 */
export type PropSpinVariant = {
	variant: SpinVariant;
};

/* validator */
export const validateSpinVariant = (component: Generic.Element.Component, value?: SpinVariant): void => {
	watchValidator(component, '_variant', (value) => value === 'cycle' || value === 'dot' || value === 'none', new Set(['cycle', 'dot', 'none']), value);
};
