import type { Generic } from 'adopted-style-sheets';

import { watchBoolean } from '../utils';

/* types */
export type HasCreateButtonPropType = boolean;

/**
 * Defines whether the element has a create button.
 */
export type PropHasCreateButton = {
	hasCreateButton: HasCreateButtonPropType;
};

/* validator */
export const validateHasCreateButton = (component: Generic.Element.Component, value?: HasCreateButtonPropType): void => {
	watchBoolean(component, '_hasCreateButton', value);
};
