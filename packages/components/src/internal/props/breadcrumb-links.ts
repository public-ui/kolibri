import type { BreadcrumbLinkProps, Stringified } from '../../schema';
import { uiUxHintMillerscheZahl } from '../../schema/utils/a11y.tipps';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeArray } from './helpers/normalizers';

/**
 * Breadcrumb links prop
 *
 * External type is `Stringified<BreadcrumbLinkProps[]>` (JSON string when set via attribute,
 * array when set via property), internal type is the parsed array.
 *
 * Item validation mirrors the legacy `watchNavLinks` predicate: every entry must be an object
 * carrying at least a string `_href` or a string `_label`. One invalid entry rejects the whole
 * value, keeping the previously rendered links — same as the predecessor.
 */
export type BreadcrumbLinksProp = Prop<'links', Stringified<BreadcrumbLinkProps[]>, BreadcrumbLinkProps[]>;

export const breadcrumbLinksProp = createPropDefinition<BreadcrumbLinksProp>(
	'links',
	[],
	(value) => normalizeArray(value) as BreadcrumbLinkProps[],
	(items) => items.every((item) => typeof item === 'object' && (typeof item._href === 'string' || typeof item._label === 'string')),
	{
		hints: (_propName, items) => uiUxHintMillerscheZahl('KolBreadcrumb', items.length),
	},
);
