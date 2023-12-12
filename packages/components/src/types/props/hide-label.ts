import { Generic } from 'adopted-style-sheets';

import { watchBoolean, WatchBooleanOptions } from '../../utils/prop.validators';

/* types */
export type HideLabelPropType = boolean;

/**
 * Tells the element to hide the label.
 */
export type PropHideLabel = {
	hideLabel: HideLabelPropType;
};

/* validator */
export const validateHideLabel = (component: Generic.Element.Component, value?: HideLabelPropType, options: WatchBooleanOptions = {}): void => {
	watchBoolean(component, '_hideLabel', value, options);
};
