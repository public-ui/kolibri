import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Hint prop for form fields
 *
 * Description:
 * A short help text below the field. It is referenced by `aria-describedby`, so assistive
 * technology announces it together with the field (WCAG 3.3.2 Labels or Instructions).
 * The empty string renders no hint.
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html
 */
export type HintProp = SimpleProp<'hint', string>;
export const hintProp = createPropDefinition<HintProp>('hint', '', normalizeString);
