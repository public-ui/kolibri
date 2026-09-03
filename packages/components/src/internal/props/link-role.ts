import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * The allowed role values for a link/button that takes the place of an ARIA role.
 */
export type AlternativeButtonLinkRolePropType = 'tab' | 'treeitem';

const LINK_ROLE_OPTIONS: readonly AlternativeButtonLinkRolePropType[] = ['tab', 'treeitem'];

/**
 * Role prop for kol-link.
 *
 * The external type is the optional union `'tab' | 'treeitem' | undefined`. Internally we use the
 * sentinel empty string `''` to represent "no role" because the prop-definition factory types the
 * default through `NonNullable<...>`, which does not admit `undefined`. Consumers that read the
 * normalized value should treat `''` as "no explicit role".
 */
export type LinkRoleProp = Prop<'role', AlternativeButtonLinkRolePropType | undefined, '' | AlternativeButtonLinkRolePropType>;

/**
 * Normalizes the role value.
 *
 * Graceful degradation: when the value is one of the allowed roles it is returned; otherwise
 * (including any non-member string) the sentinel `''` is returned so the component renders
 * without an explicit role. The factory's `apply` handles undefined/null before this is reached.
 */
function normalizeLinkRole(value: unknown): '' | AlternativeButtonLinkRolePropType {
	return typeof value === 'string' && (LINK_ROLE_OPTIONS as readonly string[]).includes(value) ? (value as AlternativeButtonLinkRolePropType) : '';
}

export const linkRoleProp = createPropDefinition<LinkRoleProp>('role', '', normalizeLinkRole);
