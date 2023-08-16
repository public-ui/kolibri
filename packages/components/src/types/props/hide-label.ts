import { Generic } from '@a11y-ui/core';

import { watchBoolean } from '../../utils/prop.validators';

/* types */
export type HideLabelPropType = boolean;

/**
 * Tells the element to hide the label.
 */
export type PropHideLabel = {
	hideLabel: HideLabelPropType;
};

/* validator */
export const validateHideLabel = (component: Generic.Element.Component, value?: HideLabelPropType): void => {
	watchBoolean(component, '_hideLabel', value);
};
