import type { Generic } from 'adopted-style-sheets';

import { watchValidator } from '../utils';

export const inputDateTypeOptions = ['date', 'datetime-local', 'month', 'time', 'week'] as const;
export type InputDateTypePropType = (typeof inputDateTypeOptions)[number];

const isInputDateTypePropType = (value: unknown): value is InputDateTypePropType => {
	return typeof value === 'string' && inputDateTypeOptions.includes(value as InputDateTypePropType);
};

export const validateTypeInputDate = (component: Generic.Element.Component, value?: InputDateTypePropType): void => {
	watchValidator(component, '_type', isInputDateTypePropType, new Set(inputDateTypeOptions), value);
};
