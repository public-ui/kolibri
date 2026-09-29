import type { Generic } from 'adopted-style-sheets';

import { watchBoolean } from '../utils';

/* types */
export type DisabledPropType = boolean;

/**
 * Makes the element non-interactive: it stays focusable and is announced as disabled (aria-disabled), but ignores activation and input.
 */
export type PropDisabled = {
	disabled: DisabledPropType;
};

/* validator */
export const validateDisabled = (component: Generic.Element.Component, value?: DisabledPropType): void => {
	watchBoolean(component, '_disabled', value);
};
