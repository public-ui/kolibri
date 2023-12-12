import type { Generic } from 'adopted-style-sheets';

import { validateAlignment } from '../../utils/validators/alignment';

/* types */
type HorizontalAlign = 'left' | 'right';
type VerticalAlign = 'top' | 'bottom';
export type AlignPropType = HorizontalAlign | VerticalAlign;

/**
 * Defines where to show the element preferably: top, right, bottom or left.
 */
export type PropAlign = {
	align: AlignPropType;
};

/* validator */
export const validateAlign = (component: Generic.Element.Component, value?: AlignPropType): void => {
	validateAlignment(component, '_align', value);
};
