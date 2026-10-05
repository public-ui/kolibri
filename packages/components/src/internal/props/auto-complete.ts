import type { AutoCompletePropType } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Auto complete prop for form fields
 *
 * Description:
 * The value of the native `autocomplete` attribute: `'on'`, `'off'` or an autofill token such as
 * `'email'`. Any non-empty string is accepted, the default is `'off'`.
 *
 * @see https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill
 * @see https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html
 */
export type AutoCompleteProp = SimpleProp<'autoComplete', AutoCompletePropType>;
export const autoCompleteProp = createPropDefinition<AutoCompleteProp>('autoComplete', 'off', normalizeString, (value) => value.length > 0);
