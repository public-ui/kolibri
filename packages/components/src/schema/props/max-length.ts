import type { Generic } from 'adopted-style-sheets';
import type { WatchNumberOptions } from '../utils';
import { watchNumber } from '../utils';

export type MaxLengthPropType = number;

export const validateMaxLength = (component: Generic.Element.Component, value?: MaxLengthPropType, options: WatchNumberOptions = {}): void => {
	watchNumber(component, '_maxLength', value, { min: 0, ...options });
};
