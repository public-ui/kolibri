import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Variant prop for spin display style
 *
 * Description:
 * Determines the visual presentation of a loading spinner. The component communicates
 * loading state through visual animation and aria-busy to assistive technologies.
 *
 * Usage (according to WAI-ARIA):
 * - "dot": Animated dots spinner (default)
 * - "cycle": Rotating cycle animation
 * - "none": Custom content via expert slot
 * - The visual variant choice is presentation-only and does not affect the accessible semantics
 *
 * Accessibility:
 * - Loading state must be announced via aria-busy (WCAG 4.1.3 Status Messages)
 * - The spinner animation must respect prefers-reduced-motion (WCAG 2.3.3 Animation from Interactions)
 * - Completion must be announced when show transitions to false (WCAG 4.1.3 Status Messages)
 *
 * @see https://www.w3.org/TR/wai-aria-1.2/#aria-busy
 * @see https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html
 * @see https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html
 */
export const spinVariantOptions = ['dot', 'cycle', 'none'] as const;
export type SpinVariantType = (typeof spinVariantOptions)[number];

export type VariantSpinProp = SimpleProp<'variant', SpinVariantType>;
export const variantSpinProp = createPropDefinition<VariantSpinProp>(
	'variant',
	'dot',
	(value: unknown) => {
		const str = normalizeString(value);
		if (spinVariantOptions.includes(str as SpinVariantType)) {
			return str as SpinVariantType;
		}
		throw new Error(`Invalid spin variant: ${str}`);
	},
	() => true,
);
