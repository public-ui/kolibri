import type { Stringified } from '../../../schema';
import { uiUxHintMillerscheZahl } from '../../../schema/utils/a11y.tipps';
import type { Prop, PropDefinition } from './factory';
import { createPropDefinition } from './factory';
import { normalizeArray } from './normalizers';

type LinkEntry = { _href?: unknown; _label?: unknown };

/**
 * The `_links` prop of a navigation component (`kol-breadcrumb`, `kol-nav`, `kol-skip-nav`).
 *
 * External type is `Stringified<T[]>` (JSON string when set via attribute, array when set via
 * property), internal type is the parsed array. Every entry must be an object carrying at least a
 * string `_href` or a string `_label`. One invalid entry rejects the whole value and keeps the
 * previous links. More than seven entries give the UI/UX hint of the Millersche Zahl for `componentName`.
 */
export function createLinksPropDefinition<T extends object>(componentName: string): PropDefinition<T[], Prop<'links', Stringified<T[]>, T[]>> {
	return createPropDefinition<Prop<'links', Stringified<T[]>, T[]>>(
		'links',
		[],
		(value) => normalizeArray(value) as T[],
		(items) =>
			items.every(
				(item) =>
					typeof item === 'object' && item !== null && (typeof (item as LinkEntry)._href === 'string' || typeof (item as LinkEntry)._label === 'string'),
			),
		{
			hints: (_propName, items) => uiUxHintMillerscheZahl(componentName, items.length),
		},
	);
}
