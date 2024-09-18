/* types */
import type { Generic } from 'adopted-style-sheets';
import { watchValidator } from '../utils';

const alternativeButtonLinkRolePropTypeOptions = ['button', 'link', 'tab', 'treeitem'] as const;
export type AlternativeButtonLinkRolePropType = (typeof alternativeButtonLinkRolePropTypeOptions)[number];

/**
 * Defines the role of the components primary element.
 */
export type PropAlternativeButtonLinkRole = {
	role: AlternativeButtonLinkRolePropType;
};

/* validator */
export const validateAlternativeButtonLinkRole = (component: Generic.Element.Component, value?: AlternativeButtonLinkRolePropType) => {
	watchValidator(
		component,
		`_role`,
		(value) => typeof value === 'string' && alternativeButtonLinkRolePropTypeOptions.includes(value),
		new Set([`KoliBriAlternativeButtonLinkRole {${alternativeButtonLinkRolePropTypeOptions.join(', ')}`]),
		value,
	);
};
