/* types */

// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-haspopup#values
export type AriaHasPopupPropType = 'dialog' | 'false' | 'grid' | 'listbox' | 'menu' | 'tree' | 'true';

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
