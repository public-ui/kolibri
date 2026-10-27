import type { Generic } from 'adopted-style-sheets';

import { watchString } from '../utils';

/* types */
export type UnitPropType = string;

/* validator */
export const validateUnit = (component: Generic.Element.Component, value?: UnitPropType): void => {
	watchString(component, '_unit', value);
};
