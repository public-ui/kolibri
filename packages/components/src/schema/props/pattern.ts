import type { Generic } from 'adopted-style-sheets';
import type { WatchStringOptions } from '../utils';
import { watchString } from '../utils';

export type PatternPropType = string;

/**
 * Defines a validation pattern for the input field.
 */
export type PropPattern = {
	pattern: PatternPropType;
};

export const validatePattern = (component: Generic.Element.Component, value?: PatternPropType, options: WatchStringOptions = {}): void => {
	watchString(component, '_pattern', value, options);
};
