import type { Generic } from 'adopted-style-sheets';

import { watchBoolean } from '../utils';

/* types */
export type HasCloserPropType = boolean;

/**
 * Defines whether the element can be closed.
 */
export type PropHasCloser = {
	hasCloser: HasCloserPropType;
};

/* validator */
export const validateHasCloser = (component: Generic.Element.Component, value?: HasCloserPropType): void => {
	watchBoolean(component, '_hasCloser', value);
};
