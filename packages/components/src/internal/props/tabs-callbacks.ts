import type { KoliBriTabsCallbacks } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeCallbacksObject } from './helpers/normalizers';

export type TabsCallbacksProp = SimpleProp<'on', KoliBriTabsCallbacks>;

/**
 * Callbacks of `kol-tabs`. Only `onCreate` and `onSelect` are kept, and only when they are
 * functions — the predecessor copied exactly these two into its state.
 */
export const tabsCallbacksProp = createPropDefinition<TabsCallbacksProp>('on', {}, (value) => {
	const callbacks = normalizeCallbacksObject<KoliBriTabsCallbacks>(value);
	const normalized: KoliBriTabsCallbacks = {};
	if (typeof callbacks.onCreate === 'function') {
		normalized.onCreate = callbacks.onCreate;
	}
	if (typeof callbacks.onSelect === 'function') {
		normalized.onSelect = callbacks.onSelect;
	}
	return normalized;
});
