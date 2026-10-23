import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Src prop for image content used eg in card
 */
export type ImageProp = SimpleProp<'image', string>;
export const imageProp = createPropDefinition<ImageProp>('image', '', normalizeString);
