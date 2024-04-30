/* types */

// https://www.w3schools.com/tags/att_a_target.asp
import type { Generic } from 'adopted-style-sheets';
import { watchString } from '../utils';

export type LinkTargetPropType = '_blank' | '_parent' | '_self' | '_top' | string;

/**
 * Defines where to open the link.
 */
export type PropLinkTarget = {
	target: LinkTargetPropType;
};

/* validator */
export const validateLinkTarget = (component: Generic.Element.Component, value?: LinkTargetPropType): void => {
	watchString(component, '_target', value);
};
