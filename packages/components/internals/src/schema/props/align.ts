import type { Generic } from 'adopted-style-sheets';

import { validateAlignment } from '../validators';
import type { AlignPropType } from './align-options';

export { alignPropTypeOptions, type AlignPropType } from './align-options';

/* types */
/**
 * Defines the visual orientation of the component: top, right, bottom or left.
 */
export type PropAlign = {
	align: AlignPropType;
};

/* validator */
export const validateAlign = (component: Generic.Element.Component, value?: AlignPropType): void => {
	validateAlignment(component, '_align', value);
};
