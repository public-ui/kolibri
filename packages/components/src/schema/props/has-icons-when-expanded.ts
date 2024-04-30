import type { Generic } from 'adopted-style-sheets';

import { watchBoolean } from '../utils';

/* types */
export type HasIconsWhenExpandedPropType = boolean;

/**
 * Shows icons next to the navigation item labels, even when the navigation is not collapsed.
 */
export type PropHasIconsWhenExpanded = {
	hasIconsWhenExpanded: HasIconsWhenExpandedPropType;
};

/* validator */
export const validateHasIconsWhenExpanded = (component: Generic.Element.Component, value?: HasIconsWhenExpandedPropType): void => {
	watchBoolean(component, '_hasIconsWhenExpanded', value);
};
