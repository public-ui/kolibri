import { Generic } from 'adopted-style-sheets';

import { watchBoolean } from '../../utils/prop.validators';

/* types */
export type DisabledPropType = boolean;

/**
 * Makes the element not focusable and ignore all events.
 */
export type PropDisabled = {
	disabled: DisabledPropType;
};

/* validator */
export const validateDisabled = (component: Generic.Element.Component, value?: DisabledPropType): void => {
	watchBoolean(component, '_disabled', value);
};
