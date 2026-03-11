import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Unit prop for value display formatting
 *
 * Description:
 * Defines the unit of measurement to display alongside a numeric value (e.g., "%", "MB", "km/h").
 * The unit helps users understand the meaning and scale of the displayed value.
 *
 * Usage:
 * - Must be a non-empty string
 * - Default is "%" (percentage)
 * - The unit is appended to the displayed value for visual users
 * - Common units: "%", "MB", "s", "€", "kg"
 *
 * Accessibility:
 * - The unit must be part of the accessible value description for screen reader users
 * - Consider using aria-valuetext to create human-readable descriptions that include the unit
 *   (e.g., aria-valuetext="75 percent" instead of just the number 75)
 * - Units convey meaningful information and must be programmatically determinable
 *   (WCAG 1.3.1 Info and Relationships)
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html
 * @see https://www.w3.org/TR/wai-aria-1.2/#aria-valuetext
 */
export type UnitProp = SimpleProp<'unit', string>;
export const unitProp = createPropDefinition<UnitProp>('unit', '%', normalizeString, (v) => v.length > 0);
