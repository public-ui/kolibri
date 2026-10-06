import type { ButtonOrLinkOrTextWithChildrenProps, Stringified } from '../../schema';
import { uiUxHintMillerscheZahl } from '../../schema/utils/a11y.tipps';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeArray } from './helpers/normalizers';

/**
 * The entries of `kol-nav`: links, buttons or texts, each with optional children.
 *
 * Every entry must be an object carrying at least a string `_href` or a string `_label`. One invalid
 * entry rejects the whole value and keeps the previous entries. The children are not validated.
 */
export type NavLinksProp = Prop<'links', Stringified<ButtonOrLinkOrTextWithChildrenProps[]>, ButtonOrLinkOrTextWithChildrenProps[]>;

export const navLinksProp = createPropDefinition<NavLinksProp>(
	'links',
	[],
	(value) => normalizeArray(value) as ButtonOrLinkOrTextWithChildrenProps[],
	(items) =>
		items.every(
			(item) => typeof item === 'object' && item !== null && (typeof (item as { _href?: unknown })._href === 'string' || typeof item._label === 'string'),
		),
	{
		hints: (_propName, items) => uiUxHintMillerscheZahl('KolNav', items.length),
	},
);
