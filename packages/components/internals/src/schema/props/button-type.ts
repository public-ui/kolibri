/* types */
import type { Generic } from 'adopted-style-sheets';
import { watchValidator } from '../utils';

const buttonTypePropTypeOptions = ['button', 'reset', 'submit'] as const;
export type ButtonTypePropType = (typeof buttonTypePropTypeOptions)[number];

/**
 * Defines either the type of the component or of the components interactive element.
 */
export type PropButtonType = {
	type: ButtonTypePropType;
};

/* validator */
export const validateButtonType = (component: Generic.Element.Component, value?: ButtonTypePropType): void => {
	watchValidator(
		component,
		`_type`,
		(value?) => typeof value === 'string' && buttonTypePropTypeOptions.includes(value),
		new Set([`KoliBriButtonType {${buttonTypePropTypeOptions.join(', ')}`]),
		value,
	);
};
