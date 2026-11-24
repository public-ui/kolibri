import type { ComponentPropsRequired } from '../../internal/functional-components/generic-types';

/* types */
export type HrefPropType = string;

/**
 * Defines the target URI of the link.
 */
export type PropHref = {
	href: HrefPropType;
};

export type HrefProp = ComponentPropsRequired<PropHref>;
