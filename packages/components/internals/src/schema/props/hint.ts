import type { Generic } from 'adopted-style-sheets';

import { watchString } from '../utils';

/* types */
export type HintPropType = string;

/**
 * Provides additional guidance below the form field.
 */
export type PropHint = {
	hint: HintPropType;
};

/* validator */
export const validateHint = (component: Generic.Element.Component, value?: HintPropType): void => {
	watchString(component, '_hint', value);
};
