import type { Generic } from 'adopted-style-sheets';

import { validateAlignment } from '../validators';

import type { AlignPropType } from './align';

/* types */
export type TooltipAlignPropType = AlignPropType;

/**
 * Defines where to show the Tooltip preferably: top, right, bottom or left.
 */
export type PropTooltipAlign = {
	tooltipAlign: TooltipAlignPropType;
};

/* validator */
export const validateTooltipAlign = (component: Generic.Element.Component, value?: TooltipAlignPropType): void => {
	validateAlignment(component, '_tooltipAlign', value);
};
