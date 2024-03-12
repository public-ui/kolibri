import type { Generic } from 'adopted-style-sheets';

import { watchValidator } from '../../utils/prop.validators';

export const watchHeadingLevel = (component: Generic.Element.Component, value?: number): void => {
	watchValidator(
		component,
		'_level',
		(value): boolean => {
			return typeof value === 'number' && 0 <= value && value <= 6;
		},
		new Set(['Number {0, 1, 2, 3, 4, 5, 6}']),
		value,
		{
			// TODO: options not in the validator
			defaultValue: 1,
			required: true,
		},
	);
};
