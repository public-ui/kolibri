import { Generic } from '@a11y-ui/core';

import { watchString, WatchStringOptions } from '../../utils/prop.validators';

export type NamePropType = string;

export type PropName = {
	name: NamePropType;
};

export const validateName = (component: Generic.Element.Component, value?: NamePropType, options?: WatchStringOptions): void => {
	watchString(component, '_name', value, options);
};
