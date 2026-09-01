import type { Prop, SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeInteger } from './helpers/normalizers';

export type TabIndexProp = SimpleProp<'tabIndex', number>;
export const tabIndexProp = createPropDefinition<TabIndexProp>('tabIndex', 0, normalizeInteger);

export type OptionalTabIndexProp = Prop<'tabIndex', number | undefined, number | undefined>;

/**
 * `tabIndex` for components whose interactive element is focusable on its own — a `<button>` or an
 * `<a href>` is in the tab order without the attribute.
 *
 * Unlike {@link tabIndexProp} the default is *unset* rather than `0`: rendering `tabindex="0"` would
 * pin the element into the document tab order explicitly. That difference is invisible in the
 * browser but shows up in the server-rendered markup and in any consumer reading the attribute.
 * Unsetting the property has to restore the unset state, which a numeric default cannot express.
 *
 * `createPropDefinition` types its default as the non-nullable internal type, so representing
 * "unset" needs one cast — here, in the single place that defines what unset means, instead of at
 * every web component that seeds or resets the property.
 */
export const optionalTabIndexProp = createPropDefinition<OptionalTabIndexProp>('tabIndex', undefined as unknown as number, normalizeInteger);
