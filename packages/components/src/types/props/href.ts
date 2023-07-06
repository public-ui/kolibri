import { Generic } from '@a11y-ui/core';

import { watchString, WatchStringOptions } from '../../utils/prop.validators';

/**
 * This property is used for a link from a reference to the target URL.
 */
export type PropHref = {
	href: string;
};

export type HrefProp = Generic.Element.Members<PropHref, unknown>;

export const validateHref = (component: Generic.Element.Component, value?: string, options: WatchStringOptions = {}): void => {
	watchString(component, '_href', value, options);
};
