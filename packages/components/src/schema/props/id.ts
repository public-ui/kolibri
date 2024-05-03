import type { Generic } from 'adopted-style-sheets';

import { watchString } from '../utils';

/* types */
export type IdPropType = string;

/**
 * Defines the internal ID of the primary component element.
 */
export type PropId = {
	id: IdPropType;
};

/* validator */
export const validateId = (component: Generic.Element.Component, value?: IdPropType): void => {
	watchString(component, '_id', value);
};
