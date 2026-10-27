import type { Generic } from 'adopted-style-sheets';
import type { WatchStringOptions } from '../utils';
import { watchString } from '../utils';

/* types */
export type WidthPropType = string;

/**
 * Defines the width of the component. (max-width: 100%)
 */
export interface PropWidth {
	width: WidthPropType;
}

/* validator */
export const validateWidth = (component: Generic.Element.Component, value?: WidthPropType, options?: WatchStringOptions): void => {
	watchString(component, '_width', value, { defaultValue: '100%', ...options });
};
