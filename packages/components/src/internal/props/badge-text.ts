import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Badge Text prop for highlighting text in labels
 *
 * Description:
 * Specifies text to be underlined and highlighted as a badge within the label.
 * This is useful for highlighting keyboard shortcuts or other important text portions.
 *
 * Usage:
 * - Default: empty string (no badge highlighting)
 * - When set: the specified text will be underlined in the label
 * - Case-sensitive matching (tries uppercase/lowercase variations if exact match not found)
 *
 * Accessibility:
 * - Underlined text must have sufficient contrast (WCAG 1.4.11)
 * - Badge text should complement, not replace, other text alternatives
 */
export type BadgeTextProp = SimpleProp<'badgeText', string>;
export const badgeTextProp = createPropDefinition<BadgeTextProp>('badgeText', '', normalizeString);
