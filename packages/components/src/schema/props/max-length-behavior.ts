import type { Generic } from 'adopted-style-sheets';

import { watchValidator } from '../utils';

/* types */
const maxLengthBehaviorPropTypeOptions = ['hard', 'soft'] as const;
export type MaxLengthBehaviorPropType = (typeof maxLengthBehaviorPropTypeOptions)[number];

/**
 * Defines the behavior when maxLength is set. 'hard' sets the maxlength attribute, 'soft' shows a character counter without preventing input.
 */
export type PropMaxLengthBehavior = {
	maxLengthBehavior: MaxLengthBehaviorPropType;
};

/* validator */
export const validateMaxLengthBehavior = (component: Generic.Element.Component, value?: MaxLengthBehaviorPropType): void => {
	watchValidator(
		component,
		'_maxLengthBehavior',
		(value): boolean => typeof value === 'string' && maxLengthBehaviorPropTypeOptions.includes(value),
		new Set(['String {hard, soft}']),
		value,
	);
};
