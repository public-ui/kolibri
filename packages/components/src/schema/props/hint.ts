import type { Generic } from 'adopted-style-sheets';
import type { WatchStringOptions } from '../utils';
import { watchString } from '../utils';

export type HintPropType = string;

/**
 * Provides additional hint text for an input element.
 */
export type PropHint = {
	hint: HintPropType;
};

export const validateHint = (component: Generic.Element.Component, value?: HintPropType, options: WatchStringOptions = {}): void => {
	watchString(component, '_hint', value, options);
};
