import type { KoliBriDialogEventCallbacks } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

export type DialogCallbacksProp = SimpleProp<'on', KoliBriDialogEventCallbacks>;

/**
 * Keeps only the callbacks the dialog actually invokes. `onToggle` is part of the published
 * callback type but has never been called, so a value passed for it is dropped instead of being
 * stored and silently ignored.
 *
 * The factory's `apply` resolves undefined/null to the default `{}` before this is reached, so
 * only a non-null value has to be verified as an object.
 */
function normalizeDialogCallbacks(value: unknown): KoliBriDialogEventCallbacks {
	if (typeof value !== 'object' || value === null) {
		throw new Error(`Invalid on callbacks: expected object, got ${typeof value}`);
	}

	const { onCancel, onClose } = value as KoliBriDialogEventCallbacks;
	const callbacks: KoliBriDialogEventCallbacks = {};
	if (typeof onCancel === 'function') {
		callbacks.onCancel = onCancel;
	}
	if (typeof onClose === 'function') {
		callbacks.onClose = onClose;
	}
	return callbacks;
}

export const dialogCallbacksProp = createPropDefinition<DialogCallbacksProp>('on', {}, normalizeDialogCallbacks);
