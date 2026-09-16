import type { LinkProps, Stringified } from '../../schema';
import { uiUxHintMillerscheZahl } from '../../schema/utils/a11y.tipps';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeArray } from './helpers/normalizers';

/**
 * SkipNav links prop.
 *
 * External type is `Stringified<LinkProps[]>` (JSON string when set via attribute,
 * array when set via property), internal type is the parsed array.
 *
 * Item validation mirrors the legacy `watchNavLinks` predicate: every entry must be an object
 * carrying at least a string `_href` or a string `_label`. One invalid entry rejects the whole
 * value, keeping the previously rendered links — same as the predecessor.
 */
export type SkipNavLinksProp = Prop<'links', Stringified<LinkProps[]>, LinkProps[]>;

export const skipNavLinksProp = createPropDefinition<SkipNavLinksProp>(
	'links',
	[],
	(value) => normalizeArray(value) as LinkProps[],
	(items) => items.every((item) => typeof item === 'object' && (typeof item._href === 'string' || typeof item._label === 'string')),
	{
		hints: (_propName, items) => uiUxHintMillerscheZahl('KolSkipNav', items.length),
	},
);
