import type { Generic } from 'adopted-style-sheets';

import { validateAlignment } from '../validators';

/* types */
const horizontalAlignOptions = ['left', 'right'] as const;
type HorizontalAlign = (typeof horizontalAlignOptions)[number];
const verticalAlignOptions = ['top', 'bottom'] as const;
type VerticalAlign = (typeof verticalAlignOptions)[number];
export const alignPropTypeOptions = [...horizontalAlignOptions, ...verticalAlignOptions] as const;
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
