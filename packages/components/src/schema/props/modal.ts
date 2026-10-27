import type { Generic } from 'adopted-style-sheets';

import { watchBoolean } from '../utils';

/* types */
export type ModalPropType = boolean;

/* validator */
export const validateModal = (component: Generic.Element.Component, value?: ModalPropType): void => {
	watchBoolean(component, '_modal', value);
};
