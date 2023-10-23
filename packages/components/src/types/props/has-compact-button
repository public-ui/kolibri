import { Generic } from '@a11y-ui/core';

import { watchBoolean } from '../../utils/prop.validators';

/* types */
/**
 * @deprecated
 */
export type HasCompactButtonPropType = boolean;

/**
 * Creates a button below the navigation, that toggles _collapsible. Only available for _orientation="vertical".
 * @deprecated
 */
export type PropHasCompactButton = {
	hasCompactButton: HasCompactButtonPropType;
};

/* validator */
export const validateHasCompactButton = (component: Generic.Element.Component, value?: HasCompactButtonPropType): void => {
	watchBoolean(component, '_hasCompactButton', value);
};
