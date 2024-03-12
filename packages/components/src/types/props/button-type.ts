/* types */
import type { Generic } from 'adopted-style-sheets';
import { watchValidator } from '../../utils/prop.validators';

export type ButtonTypePropType = 'button' | 'reset' | 'submit';

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
		(value) => value === 'button' || value === 'reset' || value === 'submit',
		new Set(['KoliBriButtonType {button, reset, submit}']),
		value,
	);
};
