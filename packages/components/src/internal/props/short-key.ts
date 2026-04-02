import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Short Key prop for keyboard shortcuts
 *
 * Description:
 * Adds a visual shortcut hint after the label and instructs the screen reader
 * to read the shortcut aloud via aria-keyshortcuts attribute.
 *
 * Usage (according to WCAG 2.1 and WAI-ARIA):
 * - Provides visual and accessible indication of keyboard shortcuts
 * - Announced to screen readers via aria-keyshortcuts
 * - Must not be the only means of accessing functionality (WCAG 2.1.1 Keyboard)
 *
 * @see https://www.w3.org/TR/wai-aria-1.2/#aria-keyshortcuts
 * @see https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html
 */
export type ShortKeyProp = SimpleProp<'shortKey', string>;
export const shortKeyProp = createPropDefinition<ShortKeyProp>('shortKey', '', normalizeString);
