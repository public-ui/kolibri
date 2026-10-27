import type { Generic } from 'adopted-style-sheets';
import type { WatchBooleanOptions } from '../utils';
import { watchBoolean } from '../utils';

export type HasValuePropType = boolean;

export const validateHasValue = (component: Generic.Element.Component, value?: HasValuePropType, options: WatchBooleanOptions = {}): void => {
	watchBoolean(component, '_hasValue', value, options);
};
