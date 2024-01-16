import type { Generic } from 'adopted-style-sheets';

import { watchBoolean } from '../utils';

type HasCompactButtonPropType = boolean;

/**
 * Creates a button below the navigation, that toggles _collapsible. Only available for _orientation="vertical".
 */
export type PropHasCompactButton = {
	hasCompactButton: HasCompactButtonPropType;
};

/* validator */
export const validateHasCompactButton = (component: Generic.Element.Component, value?: HasCompactButtonPropType): void => {
	watchBoolean(component, '_hasCompactButton', value);
};
