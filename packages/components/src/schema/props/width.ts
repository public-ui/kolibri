import type { Generic } from 'adopted-style-sheets';
import type { WatchStringOptions } from '../utils';
import { watchString } from '../utils';

/* types */
export type WidthPropType = string;

/* validator */
export const validateWidth = (component: Generic.Element.Component, value?: WidthPropType, options?: WatchStringOptions): void => {
	watchString(component, '_width', value, { defaultValue: '100%', ...options });
};
