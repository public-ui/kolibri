import type { Generic } from 'adopted-style-sheets';
import type { WatchStringOptions } from '../utils';
import { watchString } from '../utils';

export type PatternPropType = string;

export const validatePattern = (component: Generic.Element.Component, value?: PatternPropType, options: WatchStringOptions = {}): void => {
	watchString(component, '_pattern', value, options);
};
