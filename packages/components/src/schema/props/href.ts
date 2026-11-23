import type { Generic } from 'adopted-style-sheets';

import type { ComponentPropsRequired } from '../../internal/functional-components/generic-types';
import type { WatchStringOptions } from '../utils';
import { watchString } from '../utils';

/* types */
export type HrefPropType = string;

/**
 * Defines the target URI of the link.
 */
export type PropHref = {
	href: HrefPropType;
};

export type HrefProp = ComponentPropsRequired<PropHref>;

/* validator */
export const validateHref = (component: Generic.Element.Component, value?: HrefPropType, options: WatchStringOptions = {}): void => {
	watchString(component, '_href', value, options);
};
