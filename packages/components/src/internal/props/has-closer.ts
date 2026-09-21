import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeBoolean } from './helpers/normalizers';

/**
 * Renders a close button that lets the user dismiss the component.
 *
 * The component only offers the control — whether it actually disappears is the consumer's
 * decision, signalled through the `onClose` callback and the `close` DOM event.
 */
export type HasCloserProp = SimpleProp<'hasCloser', boolean>;
export const hasCloserProp = createPropDefinition<HasCloserProp>('hasCloser', false, normalizeBoolean);
