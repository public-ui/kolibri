import { Generic } from '@a11y-ui/core';

import { watchString } from '../../utils/prop.validators';

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
