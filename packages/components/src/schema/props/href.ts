import type { Generic } from 'adopted-style-sheets';

/* types */
export type HrefPropType = string;

/**
 * Defines the target URI of the link.
 */
export type PropHref = {
	href: HrefPropType;
};

export type HrefProp = Generic.Element.Members<PropHref, unknown>;
