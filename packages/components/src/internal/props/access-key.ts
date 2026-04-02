import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Access Key prop for keyboard shortcuts
 *
 * Defines a key combination that can be used to trigger or focus the component's interactive element.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey
 */
export type AccessKeyProp = SimpleProp<'accessKey', string>;

export const accessKeyProp = createPropDefinition<AccessKeyProp>('accessKey', '', normalizeString);
