import type { KoliBriIconsProp } from '../../schema/types';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeObject, normalizeString } from './helpers/normalizers';

/**
 * Icons prop for multi-directional icon display
 *
 * Description:
 * Specifies icons to display in one or more directions (top, right, bottom, left).
 * Can accept either a single icon class or an object with directional icon specifications.
 *
 * Usage:
 * - String: A single icon class name (displayed on the left by default)
 * - Object: Directional icons (e.g., { top: 'icon-class', left: 'icon-class' })
 * - Default: empty object (no icons)
 *
 * Accessibility:
 * - Icons must have descriptive labels to meet WCAG 1.1.1
 * - Use the label prop to provide text alternatives
 * - Icons should not be the sole means of conveying information (WCAG 1.3.3)
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html
 */
export type SpanIconsProp = SimpleProp<'icons', KoliBriIconsProp>;

function normalizeSpanIcons(value: unknown): KoliBriIconsProp | never {
	if (!value || (typeof value === 'string' && value === '')) {
		return {};
	}
	// If it's a string, return it as-is
	if (typeof value === 'string') {
		return normalizeString(value);
	}
	// If it's an object, normalize it
	if (typeof value === 'object') {
		return normalizeObject(value);
	}
	throw new Error(`Invalid icons: ${typeof value}`);
}

function validateSpanIcons(value: KoliBriIconsProp): boolean {
	// String is valid if it's non-empty
	if (typeof value === 'string') {
		return value.length > 0;
	}
	// Object is always valid (even if empty)
	return typeof value === 'object' && value !== null;
}

export const spanIconsProp = createPropDefinition<SpanIconsProp>('icons', {}, normalizeSpanIcons, validateSpanIcons);
