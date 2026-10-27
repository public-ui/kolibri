import type { Generic } from 'adopted-style-sheets';
import type { WatchStringOptions } from '../utils';
import { watchString } from '../utils';

export type PlaceholderPropType = string;

export const validatePlaceholder = (component: Generic.Element.Component, value?: PlaceholderPropType, options: WatchStringOptions = {}): void => {
	watchString(component, '_placeholder', value, options);
};
