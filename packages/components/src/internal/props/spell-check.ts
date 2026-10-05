import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Spell check prop for text-based form fields
 *
 * Description:
 * Whether the browser checks spelling and grammar of the value.
 *
 * @see https://html.spec.whatwg.org/multipage/interaction.html#attr-spellcheck
 */
export type SpellCheckProp = SimpleProp<'spellCheck', boolean>;
// The default is `undefined`: without a value the native attribute is not rendered and the
// browser decides.
export const spellCheckProp = createPropDefinition<SpellCheckProp>('spellCheck', undefined as unknown as boolean, normalizeBoolean);
