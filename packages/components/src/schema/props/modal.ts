import type { Generic } from 'adopted-style-sheets';

import { watchBoolean } from '../utils';

/* types */
export type ModalPropType = boolean;

/**
 * Controls if a dialog is a modal.
 */
export type PropModal = {
	modal: ModalPropType;
};

/* validator */
export const validateModal = (component: Generic.Element.Component, value?: ModalPropType): void => {
	watchBoolean(component, '_modal', value);
};
