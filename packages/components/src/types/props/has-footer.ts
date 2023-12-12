import type { Generic } from 'adopted-style-sheets';

import { watchBoolean } from '../../utils/prop.validators';

/* types */

export type HasFooterPropType = boolean;

/**
 * Shows the slot="footer".
 */
export type PropHasFooter = {
	hasFooter: HasFooterPropType;
};

/* validator */
export const validateHasFooter = (component: Generic.Element.Component, value?: HasFooterPropType): void => {
	watchBoolean(component, '_hasFooter', value);
};
