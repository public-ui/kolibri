import { Generic } from '@public-ui/core';
import { KoliBriButtonType, KoliBriButtonVariant } from '../../types/button-link';
import { a11yHint } from '../../utils/a11y.tipps';
import { watchValidator } from '../../utils/prop.validators';

export const watchButtonType = (component: Generic.Element.Component, propName: string, value?: KoliBriButtonType): void => {
	watchValidator(
		component,
		propName,
		(value) => value === 'button' || value === 'reset' || value === 'submit',
		new Set(['KoliBriButtonType {button, reset, submit}']),
		value
	);
};

export const watchButtonVariant = (component: Generic.Element.Component, propName: string, value?: KoliBriButtonVariant): void => {
	watchValidator(
		component,
		propName,
		(value) => value === 'primary' || value === 'secondary' || value === 'normal' || value === 'danger' || value === 'ghost' || value === 'custom',
		new Set(['KoliBriButtonVariant {primary, secondary, normal, danger, ghost, custom}']),
		value,
		{
			defaultValue: 'normal',
		}
	);
};
