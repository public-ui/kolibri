import type { Stringified, TabButtonProps } from '../../schema';
import { uiUxHintMillerscheZahl } from '../../schema/utils/a11y.tipps';
import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeArray } from './helpers/normalizers';

/**
 * Tab buttons of `kol-tabs`.
 *
 * External type is `Stringified<TabButtonProps[]>` (JSON string when set via attribute, array
 * when set via property), internal type is the parsed array.
 *
 * Every entry must be an object with a non-empty string `_label`. One invalid entry rejects the
 * whole value and keeps the previously rendered tabs — the predecessor's `watchJsonArrayString`
 * behaved the same way.
 */
export type TabsProp = Prop<'tabs', Stringified<TabButtonProps[]>, TabButtonProps[]>;

export const tabsProp = createPropDefinition<TabsProp>(
	'tabs',
	[],
	(value) => normalizeArray(value) as TabButtonProps[],
	(items) => items.every((item) => typeof item === 'object' && item !== null && typeof item._label === 'string' && item._label.length > 0),
	{
		hints: (_propName, items) => uiUxHintMillerscheZahl('KolTabs', items.length),
	},
);
