import { Generic } from '@a11y-ui/core';

import { watchBoolean } from '../../utils/prop.validators';

/* types */
export type OpenPropType = boolean;

/**
 * If set (to true) opens/expands the element, closes if not set (or set to false).
 */
export type PropOpen = {
	open: OpenPropType;
};

/* validator */
export const validateOpen = (component: Generic.Element.Component, value?: OpenPropType): void => {
	watchBoolean(component, '_open', value);
};
