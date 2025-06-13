/* types */

// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-haspopup#values
const ariaHasPopupOptions = ['false', 'true', 'menu', 'listbox', 'tree', 'grid', 'dialog'] as const;
export type AriaHasPopupPropType = (typeof ariaHasPopupOptions)[number];

/**
 * Defines the aria-haspopup attribute.
 */
// export type PropAriaHasPopup = {
// 	ariaHasPopup: AriaHasPopupPropType;
// };

/* validator */
// export const validateAriaHasPopup = (component: Generic.Element.Component, value?: AriaHasPopupPropType): void => {
// 	watchValidator(
// 		component,
// 		'_ariaHasPopup',
// 		(value) => typeof value === 'string' && ariaHasPopupOptions.includes(value),
// 		new Set([`KoliBriAriaHasPopup {${ariaHasPopupOptions.join(', ')}`]),
// 		value,
// 		{
// 			defaultValue: 'false',
// 		},
// 	);
// };
