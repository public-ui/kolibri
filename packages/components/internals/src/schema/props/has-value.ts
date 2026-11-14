import type { Generic } from 'adopted-style-sheets';
import type { WatchBooleanOptions } from '../utils';
import { watchBoolean } from '../utils';

export type HasValuePropType = boolean;

/**
 * Indicates whether the element currently has a value.
 */
export type PropHasValue = {
	hasValue: HasValuePropType;
};

export const validateHasValue = (component: Generic.Element.Component, value?: HasValuePropType, options: WatchBooleanOptions = {}): void => {
	watchBoolean(component, '_hasValue', value, options);
};
