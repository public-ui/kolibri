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
 * One of the allowed roles is returned as is; the empty string means "no explicit role" and
 * yields the sentinel. Any other value throws, so the factory logs a `devWarning` and keeps the
 * previous value instead of degrading silently. The factory's `apply` handles undefined/null
 * before this is reached.
 */
function normalizeLinkRole(value: unknown): '' | AlternativeButtonLinkRolePropType {
	if (value === '') {
		return '';
	}
	if (typeof value === 'string' && (LINK_ROLE_OPTIONS as readonly string[]).includes(value)) {
		return value as AlternativeButtonLinkRolePropType;
	}
	throw new Error(`Invalid role: expected one of ${LINK_ROLE_OPTIONS.join(', ')}, got ${JSON.stringify(value)}`);
}

export const linkRoleProp = createPropDefinition<LinkRoleProp>('role', '', normalizeLinkRole);
