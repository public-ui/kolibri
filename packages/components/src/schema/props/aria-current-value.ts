/* types */

/**
 * Defines the value for the aria-current attribute.
 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current
 * @see https://www.aditus.io/aria/aria-current/
 */
export type AriaCurrentValuePropType = 'date' | 'location' | 'page' | 'step' | 'time' | 'true' | 'false';

export type PropAriaCurrentValue = {
	ariaCurrentValue: AriaCurrentValuePropType;
};
