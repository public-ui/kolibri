import { Generic } from '@a11y-ui/core';

import { validateAlignment } from '../../utils/validators/alignment';

/* types */
/**
 * Defines where to show the Tooltip preferably: top, right, bottom or left.
 */
type HorizontalAlign = 'left' | 'right';
type VerticalAlign = 'top' | 'bottom';
export type AlignPropType = HorizontalAlign | VerticalAlign;

export type PropAlign = {
	align: AlignPropType;
};

/* validator */
export const validateAlign = (component: Generic.Element.Component, value?: AlignPropType): void => {
	validateAlignment(component, '_align', value);
};
