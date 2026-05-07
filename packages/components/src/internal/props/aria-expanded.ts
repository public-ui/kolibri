import type { Prop } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * Aria-expanded prop with three states:
 * - '' (empty string): attribute not set
 * - 'true': aria-expanded="true"
 * - 'false': aria-expanded="false"
 */
export type AriaExpandedProp = Prop<'ariaExpanded', boolean, string>;
export const ariaExpandedProp = createPropDefinition<AriaExpandedProp>('ariaExpanded', '', (value) => {
	if (value === undefined || value === null || value === '') return '';
	if (typeof value === 'boolean') return value ? 'true' : 'false';
	if (value === 'true' || value === 'false') return value;
	throw new Error(`Invalid ariaExpanded: ${typeof value}`);
});
