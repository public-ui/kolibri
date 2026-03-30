import type { Generic } from 'adopted-style-sheets';

import type { HeadingLevel } from '../../internal/props/level';
import { headingLevelOptions } from '../../internal/props/level';
import { watchValidator } from '../../schema/utils';

export const watchHeadingLevel = (component: Generic.Element.Component, value?: HeadingLevel): void => {
	watchValidator(
		component,
		'_level',
		(value?: HeadingLevel): boolean => typeof value === 'number' && headingLevelOptions.includes(value),
		new Set(headingLevelOptions.map(String)),
		value,
		{
			defaultValue: 1,
			required: true,
		},
	);
};
