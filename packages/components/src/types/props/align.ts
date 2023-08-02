import { Generic } from '@a11y-ui/core';

import { validateAlignment } from '../../utils/validators/alignment';

/* types */
/**
 * Marks the element as the selected in a group of related elements. Can be one of the following: `date` | `location` | `page` | `step` | `time` | `true`.
 *  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
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
