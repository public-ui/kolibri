import type { Generic } from 'adopted-style-sheets';
import type { WatchNumberOptions } from '../utils';
import { watchNumber } from '../utils';

export type CurrentLengthPropType = number;

export const validateCurrentLength = (component: Generic.Element.Component, value?: CurrentLengthPropType, options: WatchNumberOptions = {}): void => {
	watchNumber(component, '_currentLength', value, options);
};
