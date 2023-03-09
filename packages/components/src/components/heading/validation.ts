import { Generic } from '@a11y-ui/core';
import { watchValidator } from '../../utils/prop.validators';

export const watchHeadingLevel = (component: Generic.Element.Component, value?: number): void => {
	watchValidator(
		component,
		'_level',
		(value): boolean => {
			return typeof value === 'number' && 1 <= value && value <= 6;
		},
		new Set(['Number {1, 2, 3, 4, 5, 6}']),
		value,
		{
			defaultValue: 1,
			required: true,
		}
	);
};
