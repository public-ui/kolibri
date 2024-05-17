import type { Generic } from 'adopted-style-sheets';

import type { WatchStringOptions } from '../utils';
import { watchString } from '../utils';

/* types */
export type HrefPropType = string;

/**
 * This property is used for a link from a reference to the target URL.
 */
export type PropHref = {
	href: HrefPropType;
};

export type HrefProp = Generic.Element.Members<PropHref, unknown>;

/* validator */
export const validateHref = (component: Generic.Element.Component, value?: HrefPropType, options: WatchStringOptions = {}): void => {
	watchString(component, '_href', value, options);
};
