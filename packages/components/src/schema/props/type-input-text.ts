export const inputTextTypeOptions = ['text', 'search', 'url', 'tel'] as const;
export type InputTextTypePropType = (typeof inputTextTypeOptions)[number];

/**
 * Defines the type of the input-text component.
 */
export type PropTypeInputText = {
	type: InputTextTypePropType;
};
