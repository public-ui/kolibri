import { Generic } from '@a11y-ui/core';

import { watchBoolean } from '../../utils/prop.validators';

/* types */

export type HideLabelPropType = boolean;

/** de
 * Lässt das Element das Label ausblenden.
 */
/** en
 * Tells the element to hide the label.
 */
export type PropHideLabel = {
	hideLabel: HideLabelPropType;
};

/* validator */
export const validateHideLabel = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_hideLabel', value);
};
