import type { Generic } from 'adopted-style-sheets';
import type { WatchNumberOptions } from '../utils';
import { watchNumber } from '../utils';

export type CurrentLengthPropType = number;

/**
 * Tracks the current length of the input value.
 */
export type PropCurrentLength = {
	currentLength: CurrentLengthPropType;
};

export const validateCurrentLength = (component: Generic.Element.Component, value?: CurrentLengthPropType, options: WatchNumberOptions = {}): void => {
	watchNumber(component, '_currentLength', value, options);
};
