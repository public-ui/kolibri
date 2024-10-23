import type { Generic } from 'adopted-style-sheets';
import { watchString } from '../utils';
import { AccessKeyPropType } from './access-key';

/* types */
export type BadgeTextPropType = string;

/**
 * Defines the elements badge text.
 */
export type PropBadgeText = {
	badgeText: AccessKeyPropType;
};

/* validator */
export const validateBadgeText = (component: Generic.Element.Component, value?: AccessKeyPropType): void => {
	watchString(component, '_badgeText', value);
};
