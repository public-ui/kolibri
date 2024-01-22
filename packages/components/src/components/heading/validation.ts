import type { HeadingLevel } from '@public-ui/schema';
import { headingLevelOptions, watchValidator } from '@public-ui/schema';

import type { Generic } from 'adopted-style-sheets';

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
