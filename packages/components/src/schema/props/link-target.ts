/* types */

// https://www.w3schools.com/tags/att_a_target.asp

export type LinkTargetPropType = '_blank' | '_parent' | '_self' | '_top' | string;

/**
 * Defines where to open the link.
 */
export type PropLinkTarget = {
	target: LinkTargetPropType;
};
