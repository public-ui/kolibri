import type { KoliBriModalEventCallbacks } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

export type DrawerCallbacksProp = SimpleProp<'on', KoliBriModalEventCallbacks>;

/**
 * Keeps only the three callbacks the drawer invokes and drops everything else, so a value that is
 * not a function can never reach a call site.
 *
 * Unlike `dialogCallbacksProp` this keeps `onToggle`: the drawer reports every open and close
 * through it.
 *
 * The factory's `apply` resolves undefined/null to the default `{}` before this is reached, so
 * only a non-null value has to be verified as an object.
 */
function normalizeDrawerCallbacks(value: unknown): KoliBriModalEventCallbacks {
	if (typeof value !== 'object' || value === null) {
		throw new Error(`Invalid on callbacks: expected object, got ${typeof value}`);
	}

	const { onCancel, onClose, onToggle } = value as KoliBriModalEventCallbacks;
	const callbacks: KoliBriModalEventCallbacks = {};
	if (typeof onCancel === 'function') {
		callbacks.onCancel = onCancel;
	}
	if (typeof onClose === 'function') {
		callbacks.onClose = onClose;
	}
	if (typeof onToggle === 'function') {
		callbacks.onToggle = onToggle;
	}
	return callbacks;
}

export const drawerCallbacksProp = createPropDefinition<DrawerCallbacksProp>('on', {}, normalizeDrawerCallbacks);
