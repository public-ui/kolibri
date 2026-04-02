import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Access Key prop for keyboard shortcuts
 *
 * Description:
 * Defines the key combination that can be used to trigger or focus the component's
 * interactive element. The actual key combination varies by browser and operating system
 * (e.g., Alt+key on Windows, Control+Option+key on macOS).
 *
 * Usage (according to WCAG 2.1 and HTML specification):
 * - Should be a single character
 * - Avoid conflicts with browser/OS shortcuts
 * - Consider using aria-keyshortcuts for better screen reader support
 * - Must not be the only means of accessing functionality (WCAG 2.1.1 Keyboard)
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey
 * @see https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html
 */
export type AccessKeyProp = SimpleProp<'accessKey', string>;
export const accessKeyProp = createPropDefinition<AccessKeyProp>('accessKey', '', normalizeString);
