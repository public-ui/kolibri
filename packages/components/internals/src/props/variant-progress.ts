import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

/**
 * Variant prop for progress display style
 *
 * Description:
 * Determines the visual presentation of a progress indicator. Both variants use the
 * WAI-ARIA progressbar role and convey the same semantic information to assistive technologies.
 *
 * Usage (according to W3C HTML specification and WAI-ARIA):
 * - "bar": Linear horizontal progress bar (default)
 * - "cycle": Circular/radial progress indicator
 * - Both variants must expose role="progressbar" with aria-valuenow, aria-valuemin, and aria-valuemax
 * - The visual variant choice is presentation-only and does not affect the accessible semantics
 *
 * Accessibility:
 * - Progress state must be announced to screen readers (WCAG 4.1.3 Status Messages)
 * - The progress indicator must be perceivable through non-visual means (WCAG 1.1.1 Non-text Content)
 * - Animation in the cycle variant must respect prefers-reduced-motion (WCAG 2.3.3 Animation from Interactions)
 *
 * @see https://html.spec.whatwg.org/multipage/form-elements.html#the-progress-element
 * @see https://www.w3.org/TR/wai-aria-1.2/#progressbar
 * @see https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html
 */
export const progressVariantOptions = ['bar', 'cycle'] as const;
export type ProgressVariantType = (typeof progressVariantOptions)[number];

export type VariantProgressProp = SimpleProp<'variant', ProgressVariantType>;
export const variantProgressProp = createPropDefinition<VariantProgressProp>(
	'variant',
	'bar',
	(value: unknown) => {
		const str = normalizeString(value);
		if (progressVariantOptions.includes(str as ProgressVariantType)) {
			return str as ProgressVariantType;
		}
		throw new Error(`Invalid progress variant: ${str}`);
	},
	() => true,
);
