import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

const BUTTON_VARIANTS = ['custom', 'danger', 'ghost', 'normal', 'primary', 'secondary', 'tertiary'] as const;
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

/**
 * Button Variant prop for presentation style
 *
 * Description:
 * Defines which variant should be used for presentation.
 * Each variant has a specific visual style and semantic meaning.
 *
 * Variants:
 * - normal: Default button style
 * - primary: Primary action (emphasized)
 * - secondary: Secondary action
 * - tertiary: Tertiary action (least emphasis)
 * - danger: Destructive or dangerous action
 * - ghost: Minimal styling, transparent background
 * - custom: Use custom styling via _customClass prop
 *
 * Usage (according to WCAG 2.1):
 * - Ensure sufficient contrast for all variants (WCAG 1.4.3)
 * - Don't rely on color alone to convey meaning (WCAG 1.4.1)
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html
 * @see https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
 */
export type ButtonVariantProp = SimpleProp<'variant', ButtonVariant>;
export const buttonVariantProp = createPropDefinition<ButtonVariantProp>(
	'variant',
	'normal',
	(value: unknown) => {
		const normalized = normalizeString(value);
		return BUTTON_VARIANTS.includes(normalized as ButtonVariant) ? (normalized as ButtonVariant) : 'normal';
	},
	(v) => BUTTON_VARIANTS.includes(v),
);
