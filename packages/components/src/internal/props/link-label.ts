import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * Label prop for link components that supports the expert-slot pattern.
 * When set to `false`, the expert slot is shown instead of a text label.
 */
export type LinkLabelProp = Prop<'label', string | false, string | false>;
export const linkLabelProp = createPropDefinition<LinkLabelProp>('label', '', (value) => {
	if (value === undefined || value === null || value === '') return '';
	if (value === false) return false;
	if (typeof value === 'string') return value;
	throw new Error(`Invalid label: ${typeof value}`);
});
