import type { Generic } from 'adopted-style-sheets';

import { watchValidator } from '../utils';

export const inputTextTypeOptions = ['text', 'search', 'url', 'tel'] as const;
export type InputTextTypePropType = (typeof inputTextTypeOptions)[number];

/**
 * Defines the type of the input-text component.
 */
export type PropTypeInputText = {
	type: InputTextTypePropType;
};

const isInputTextTypePropType = (value: unknown): value is InputTextTypePropType => {
    return typeof value === 'string' && inputTextTypeOptions.includes(value as InputTextTypePropType);
};

export const validateTypeInputText = (component: Generic.Element.Component, value?: InputTextTypePropType): void => {
    watchValidator(component, '_type', isInputTextTypePropType, new Set(inputTextTypeOptions), value);
};
