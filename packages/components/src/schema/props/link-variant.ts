/* types */

const linkVariantPropTypeOptions = ['inline', 'standalone'] as const;

/**
 * @deprecated Use the new _inline property instead.
 */
export type LinkVariantPropType = (typeof linkVariantPropTypeOptions)[number];

/**
 * @deprecated Use the new _inline property instead.
 */
export type PropLinkVariant = {
	variant: LinkVariantPropType;
};
