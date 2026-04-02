import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

const ALTERNATIVE_ROLES = ['button', 'link', 'tab'] as const;
export type AlternativeButtonLinkRole = (typeof ALTERNATIVE_ROLES)[number];

/**
 * Alternative Button Link Role prop for semantic role
 *
 * Description:
 * Defines the role of the component's primary element.
 * Allows semantic override of the native button element.
 *
 * Usage (according to WAI-ARIA):
 * - button: Interactive control that triggers an action
 * - link: Navigation to another page or location
 * - tab: Tab in a tablist (part of tabs pattern)
 *
 * Note: This prop is deprecated. We prefer using semantic HTML elements.
 *
 * @deprecated We prefer the semantic role of the HTML element and do not allow for customization.
 * This prop will be removed in a future version.
 *
 * @see https://www.w3.org/TR/wai-aria-1.2/#button
 * @see https://www.w3.org/TR/wai-aria-1.2/#link
 * @see https://www.w3.org/TR/wai-aria-1.2/#tab
 */
export type AlternativeButtonLinkRoleProp = SimpleProp<'role', AlternativeButtonLinkRole>;
export const alternativeButtonLinkRoleProp = createPropDefinition<AlternativeButtonLinkRoleProp>(
	'role',
	'button',
	(value: unknown) => {
		const normalized = normalizeString(value);
		return ALTERNATIVE_ROLES.includes(normalized as AlternativeButtonLinkRole) ? (normalized as AlternativeButtonLinkRole) : 'button';
	},
	(v) => ALTERNATIVE_ROLES.includes(v),
);
