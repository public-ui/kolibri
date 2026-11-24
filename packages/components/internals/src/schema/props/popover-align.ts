import type { Generic } from 'adopted-style-sheets';

import { validateAlignment } from '../validators';

import type { AlignPropType } from './align';

/* types */
export type PopoverAlignPropType = AlignPropType;

/**
 * Defines where to show the popover preferably: top, right, bottom or left.
 */
export type PropPopoverAlign = {
	popoverAlign: PopoverAlignPropType;
};

/* validator */
export const validatePopoverAlign = (component: Generic.Element.Component, value?: PopoverAlignPropType): void => {
	validateAlignment(component, '_popoverAlign', value);
};
