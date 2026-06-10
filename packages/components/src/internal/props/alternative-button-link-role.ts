import type { AlternativeButtonLinkRolePropType } from '../../schema';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

const ALTERNATIVE_ROLES = ['tab', 'treeitem'] as const;
export type AlternativeButtonLinkRole = AlternativeButtonLinkRolePropType;

/**
 * Alternative Button Link Role prop for semantic role
 *
 * Description:
 * Defines the role of the component's primary element.
 * Allows semantic override of the native button element.
 *
 * Usage (according to WAI-ARIA):
 * - tab: Tab in a tablist (part of tabs pattern)
 * - treeitem: Item in a tree (part of tree pattern)
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
/**
 * Internally the empty string represents "not set", so no role attribute is
 * rendered and the semantic role of the native HTML element is used.
 */
export type AlternativeButtonLinkRoleProp = Prop<'role', AlternativeButtonLinkRole, AlternativeButtonLinkRole | ''>;
export const alternativeButtonLinkRoleProp = createPropDefinition<AlternativeButtonLinkRoleProp>(
	'role',
	'',
	(value: unknown) => {
		const normalized = normalizeString(value);
		return ALTERNATIVE_ROLES.includes(normalized as AlternativeButtonLinkRole) ? (normalized as AlternativeButtonLinkRole) : '';
	},
	(v) => v === '' || ALTERNATIVE_ROLES.includes(v),
);
