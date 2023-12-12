import { Generic } from 'adopted-style-sheets';

import { watchValidator } from '../../utils/prop.validators';
import { HeadingLevel, headingLevelOptions } from '../../types/heading-level';

export const watchHeadingLevel = (component: Generic.Element.Component, value?: HeadingLevel): void => {
	watchValidator(
		component,
		'_level',
		(value?: HeadingLevel): boolean => {
			return typeof value === 'number' && headingLevelOptions.includes(value);
		},
		new Set([`Number {${headingLevelOptions.join(', ')}`]),
		value,
		{
			// TODO: options not in the validator
			defaultValue: 1,
			required: true,
		}
	);
};
