/* types */
export type MaxLengthBehaviorPropType = 'hard' | 'soft';

/**
 * Defines the behavior when maxLength is set. 'hard' sets the maxlength attribute, 'soft' shows a character counter without preventing input.
 */
export type PropMaxLengthBehavior = {
	maxLengthBehavior: MaxLengthBehaviorPropType;
};
