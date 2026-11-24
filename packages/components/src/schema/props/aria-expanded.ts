/* types */
export type AriaExpandedPropType = boolean;

/**
 * Marks this element as open/expanded, or that the connected element (aria-controls/aria-owns) is open/expanded.
 * (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
 */
export type PropAriaExpanded = {
	ariaExpanded: AriaExpandedPropType;
};
