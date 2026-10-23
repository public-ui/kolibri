import type { Generic } from 'adopted-style-sheets';

import { watchValidator } from '../utils';

export const quoteVariantOptions = ['block', 'inline'] as const;

/**
 * @deprecated Unused legacy schema of `kol-quote`. The component normalizes and validates its props
 * internally (`internal/props`); this exported schema is kept only for backwards compatibility and
 * will be removed in a future major release.
 */
export type QuoteVariantPropType = (typeof quoteVariantOptions)[number];

/**
 * Defines the variant for presenting quotes.
 *
 * @deprecated Unused legacy schema of `kol-quote`. See `QuoteVariantPropType`.
 */
export type PropVariantQuote = {
	variant: QuoteVariantPropType;
};

const isQuoteVariantPropType = (value: unknown): value is QuoteVariantPropType => {
	return typeof value === 'string' && quoteVariantOptions.includes(value as QuoteVariantPropType);
};

/**
 * @deprecated Unused legacy schema of `kol-quote`. The component validates its props internally
 * (`internal/props`); this exported validator is kept only for backwards compatibility and will be
 * removed in a future major release.
 */
export const validateVariantQuote = (component: Generic.Element.Component, value?: QuoteVariantPropType): void => {
	watchValidator(component, '_variant', isQuoteVariantPropType, new Set(quoteVariantOptions), value);
};
