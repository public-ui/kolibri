import { Generic } from '@a11y-ui/core';

import { watchBoolean } from '../../utils/prop.validators';

/* types */
export type CheckedPropType = boolean;

/**
 * Defines whether the checkbox is checked or not. Can be read and written.
 */
export type PropChecked = {
	checked: CheckedPropType;
};

/* validator */
export const validateChecked = (component: Generic.Element.Component, value?: CheckedPropType): void => {
	watchBoolean(component, '_checked', value);
};
