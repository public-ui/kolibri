import type { AccessKeyPropType } from './access-key';
import type { ShortKeyPropType } from './short-key';

/* types */
export type BadgeTextPropType = AccessKeyPropType | ShortKeyPropType;

/**
 * Defines the elements badge text.
 */
export type PropBadgeText = {
	badgeText: BadgeTextPropType;
};
