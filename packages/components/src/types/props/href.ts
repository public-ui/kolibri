import { Generic } from '@a11y-ui/core';
import { WatchStringOptions, watchString } from '../../utils/prop.validators';

export type PropHref = {
	href: string;
};

export type HrefProp = Generic.Element.Members<PropHref, unknown>;

export const validateHref = (component: Generic.Element.Component, value?: string, options: WatchStringOptions = {}): void => {
	watchString(component, '_href', value, options);
};
