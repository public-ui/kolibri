/* types */
import type { Generic } from 'adopted-style-sheets';
import { watchValidator } from '../utils';

const labelAlignPropTypeOptions = ['left', 'right'] as const;
export type LabelAlignPropType = (typeof labelAlignPropTypeOptions)[number];

/**
 * Defines which alignment should be used for presentation.
 */
export type PropLabelAlign = {
	labelAlign: LabelAlignPropType;
};

/* validator */
export const validateLabelAlign = (component: Generic.Element.Component, value?: LabelAlignPropType): void => {
	watchValidator(
		component,
		`_labelAlign`,
		(value) => typeof value === 'string' && labelAlignPropTypeOptions.includes(value),
		new Set([`KoliBriLabelAlign {${labelAlignPropTypeOptions.join(', ')}`]),
		value,
	);
};
