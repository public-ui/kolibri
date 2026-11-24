/* types */
export const autoCompleteOptions = ['on', 'off'] as const;
export type AutoCompletePropType = (typeof autoCompleteOptions)[number] | string;

/**
 * Defines the auto-complete behavior for an element.
 */
export type PropAutoComplete = {
	autoComplete: AutoCompletePropType;
};
