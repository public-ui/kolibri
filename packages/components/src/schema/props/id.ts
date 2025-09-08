import type { Generic } from 'adopted-style-sheets';

import { watchString } from '../utils';

/* types */
export type IdPropType = string;

/**
 * @deprecated Will be removed in the next major version. Defines the internal ID of the primary component element.
 */
export type PropId = {
	id: IdPropType;
};

/* validator */
/** @deprecated Will be removed in the next major version. */
export const validateId = (component: Generic.Element.Component, value?: IdPropType): void => {
	watchString(component, '_id', value);
};
