/* types */
/**
 * Marks the element as the selected in a group of related elements. Can be one of the following: `date` | `location` | `page` | `step` | `time` | `true`.
 *  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
 */
const ariaCurrentPropTypeOptions = ['date', 'location', 'page', 'step', 'time', true, false] as const;
export type AriaCurrentPropType = (typeof ariaCurrentPropTypeOptions)[number];

export type PropAriaCurrent = {
	// only used for state
	ariaCurrent: AriaCurrentPropType;
};
