import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Placeholder prop for text-based form fields
 *
 * Description:
 * A short hint shown in the empty control. It does not replace the label.
 *
 * @see https://html.spec.whatwg.org/multipage/input.html#attr-input-placeholder
 */
export type PlaceholderProp = SimpleProp<'placeholder', string>;
// The default is `undefined`: the native attribute is only rendered when a placeholder is set.
export const placeholderProp = createPropDefinition<PlaceholderProp>('placeholder', undefined as unknown as string, normalizeString);
