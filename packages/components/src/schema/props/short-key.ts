/* types */
export type ShortKeyPropType = string;

/**
 * Adds a visual short key hint to the component and sets the `aria-keyshortcuts` attribute on the focusable element.
 */
export type PropShortKey = {
	shortKey: ShortKeyPropType;
};
