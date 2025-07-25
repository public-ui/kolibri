import type { Generic } from 'adopted-style-sheets';

import { watchValidator } from '../utils';

export const textareaResizeOptions = ['vertical', 'none'] as const;
export type TextareaResizePropType = (typeof textareaResizeOptions)[number];

/**
 * Defines how the textarea can be resized by the user.
 */
export type PropResizeTextarea = {
	resize: TextareaResizePropType;
};

export const validateResizeTextarea = (component: Generic.Element.Component, value?: TextareaResizePropType): void => {
	watchValidator(component, '_resize', (value) => typeof value === 'string' && textareaResizeOptions.includes(value), new Set(textareaResizeOptions), value, {
		defaultValue: 'vertical',
	});
};
