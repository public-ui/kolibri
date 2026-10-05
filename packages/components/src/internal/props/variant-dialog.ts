import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Variant prop for the dialog's presentation.
 *
 * - `blank`: the dialog renders its content directly and takes its accessible name from `_label`.
 * - `card`: the content is wrapped in a card whose heading carries the label and which offers a
 *   close button.
 */
const DIALOG_VARIANT_OPTIONS = ['blank', 'card'] as const;
export type DialogVariantType = (typeof DIALOG_VARIANT_OPTIONS)[number];
export type VariantDialogProp = SimpleProp<'variant', DialogVariantType>;

const DIALOG_VARIANT_SET: ReadonlySet<string> = new Set(DIALOG_VARIANT_OPTIONS);

export const variantDialogProp = createPropDefinition<VariantDialogProp>(
	'variant',
	'blank',
	(value: unknown) => normalizeString(value) as DialogVariantType,
	(v) => DIALOG_VARIANT_SET.has(v),
);
