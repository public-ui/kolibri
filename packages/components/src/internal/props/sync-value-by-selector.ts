import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Sync value by selector prop for form fields
 *
 * Description:
 * A CSS selector of a native form control outside the component that receives the field value,
 * in experimental mode only. The form association behavior reads it; it is never rendered.
 */
export type SyncValueBySelectorProp = SimpleProp<'syncValueBySelector', string>;
// The default is `undefined` (not `''` like other string props): an empty string is not a valid
// selector, so "not set" must stay distinguishable and must not reach `document.querySelector`.
export const syncValueBySelectorProp = createPropDefinition<SyncValueBySelectorProp>('syncValueBySelector', undefined as unknown as string, normalizeString);
