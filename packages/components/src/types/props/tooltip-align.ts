import { Generic } from '@a11y-ui/core';

import { validateAlignment } from '../../utils/validators/alignment';
import { AlignPropType } from './align';

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
