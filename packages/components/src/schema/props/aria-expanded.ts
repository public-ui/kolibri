import type { Generic } from 'adopted-style-sheets';

import { watchBoolean } from '../utils';

/* types */
export type AriaExpandedPropType = boolean;

/* validator */
export const validateAriaExpanded = (component: Generic.Element.Component, value?: AriaExpandedPropType): void => {
	watchBoolean(component, '_ariaExpanded', value);
};
