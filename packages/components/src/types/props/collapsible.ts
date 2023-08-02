import { Generic } from '@a11y-ui/core';

import { watchBoolean } from '../../utils/prop.validators';

/* types */
export type CollapsiblePropType = boolean;

/**
 * If set to false navigation nodes cannot be collapsed.
 */
export type PropCollapsible = {
	collapsible: CollapsiblePropType;
};

/* validator */
export const validateCollapsible = (component: Generic.Element.Component, value?: CollapsiblePropType): void => {
	watchBoolean(component, '_collapsible', value);
};
