import type { Generic } from 'adopted-style-sheets';

import { watchBoolean } from '../utils';

/* types */
export type IndeterminatePropType = boolean;

/**
 * Puts the checkbox in the indeterminate state, does not change the value of _checked.
 */
export type PropIndeterminate = {
	indeterminate: IndeterminatePropType;
};

/* validator */
export const validateIndeterminate = (component: Generic.Element.Component, value?: IndeterminatePropType): void => {
	watchBoolean(component, '_indeterminate', value);
};
