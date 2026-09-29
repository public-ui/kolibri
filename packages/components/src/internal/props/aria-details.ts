import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Aria details prop for form fields
 *
 * Description:
 * An IDREF list (space-separated) of elements outside the component that provide accessible
 * details for the field. The component resolves the IDs and hands the elements to
 * `ElementInternals.ariaDetailsElements`, because a plain `aria-details` attribute cannot
 * reference across the shadow boundary.
 *
 * The empty string means "no details"; it resolves to no elements, like an unset value.
 *
 * @see https://www.w3.org/TR/wai-aria-1.2/#aria-details
 */
export type AriaDetailsProp = SimpleProp<'ariaDetails', string>;
export const ariaDetailsProp = createPropDefinition<AriaDetailsProp>('ariaDetails', '', normalizeString);
