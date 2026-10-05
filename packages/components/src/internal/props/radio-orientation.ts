import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import type { OrientationPropType } from './orientation';
import { normalizeOrientation } from './orientation';

/**
 * Orientation prop for radio groups
 *
 * Description:
 * Arranges the options of `kol-input-radio` among each other (`vertical`, the default) or side by side
 * (`horizontal`).
 */
export type RadioOrientationProp = SimpleProp<'orientation', OrientationPropType>;
export const radioOrientationProp = createPropDefinition<RadioOrientationProp>('orientation', 'vertical', normalizeOrientation);
