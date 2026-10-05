import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Accept prop for file fields
 *
 * Description:
 * The file types the file dialog offers, as a comma separated list of file extensions and MIME types.
 *
 * @see https://html.spec.whatwg.org/multipage/input.html#attr-input-accept
 */
export type AcceptProp = SimpleProp<'accept', string>;
// The default is `undefined`: the native attribute is only rendered when file types are set.
export const acceptProp = createPropDefinition<AcceptProp>('accept', undefined as unknown as string, normalizeString);
