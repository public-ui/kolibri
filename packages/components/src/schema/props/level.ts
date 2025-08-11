import type { Generic } from 'adopted-style-sheets';
import { watchValidator } from '../utils';
import { headingLevelOptions, type HeadingLevel } from './label';

export type LevelPropType = HeadingLevel;

/**
 * Sets the heading level of the component.
 */
export type PropLevel = {
	level: LevelPropType;
};

export const validateLevel = (component: Generic.Element.Component, value?: LevelPropType): void => {
	watchValidator(
		component,
		'_level',
		(value?: LevelPropType): boolean => typeof value === 'number' && headingLevelOptions.includes(value),
		new Set(headingLevelOptions.map(String)),
		value,
		{
			defaultValue: 1,
			required: true,
		},
	);
};
