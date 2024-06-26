import type { Generic } from 'adopted-style-sheets';

import { watchBoolean } from '../utils';

/* types */
export type ModalPropType = boolean;

/**
 * Makes the element not focusable and ignore all events.
 */
export type PropModal = {
	modal: ModalPropType;
};

/* validator */
export const validateModal = (component: Generic.Element.Component, value?: ModalPropType): void => {
	watchBoolean(component, '_modal', value);
};
