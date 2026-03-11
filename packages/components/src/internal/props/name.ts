import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Name prop for form element identification
 *
 * Description:
 * The name attribute identifies form controls for form submission and server-side processing.
 * It associates a control's value with a key when the form is submitted.
 *
 * Usage (according to W3C HTML specification):
 * - Must be a non-empty, unique string within the form context
 * - Used as the key in submitted form data (name=value pairs)
 * - Essential for accessible form handling and assistive technology interaction
 * - Should not be used solely for styling or scripting purposes
 *
 * Accessibility:
 * - Assistive technologies may expose the name to users to help identify form controls
 * - Form controls must be identifiable and operable (WCAG 4.1.2 Name, Role, Value)
 *
 * @see https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-name
 * @see https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html
 */
export type NameProp = SimpleProp<'name', string>;
export const nameProp = createPropDefinition<NameProp>('name', '', normalizeString);
