import type { LabelPropType } from '../../schema/props/label';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';
import { isValidLabel } from './helpers/validators';
import { labelHints } from './hints/label-hints';

/**
 * Label prop of `kol-pagination`
 *
 * Description:
 * The accessible name of the navigation. Same validation as `labelProp` (empty string as "not
 * set", otherwise at least 2 characters); kept as a separate export for its meaning — the label
 * of the pagination navigation landmark.
 */
export type PaginationLabelProp = SimpleProp<'label', LabelPropType>;
export const paginationLabelProp = createPropDefinition<PaginationLabelProp>('label', '', normalizeString, isValidLabel, {
	hints: labelHints,
});
