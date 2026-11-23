export const textareaResizeOptions = ['vertical', 'none'] as const;
export type TextareaResizePropType = (typeof textareaResizeOptions)[number];

/**
 * Defines how the textarea can be resized by the user.
 */
export type PropResizeTextarea = {
	resize: TextareaResizePropType;
};
