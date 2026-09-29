import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Required prop for form fields
 *
 * Description:
 * Marks a form field as mandatory. The label shows the required marker and the native control
 * gets the `required` attribute (WCAG 3.3.2 Labels or Instructions).
 *
 * @see https://html.spec.whatwg.org/multipage/input.html#attr-input-required
 * @see https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html
 */
export type RequiredProp = SimpleProp<'required', boolean>;
export const requiredProp = createPropDefinition<RequiredProp>('required', false, normalizeBoolean);
