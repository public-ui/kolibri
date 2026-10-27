import type { Generic } from 'adopted-style-sheets';

import { watchValidator } from '../utils';

export const quoteVariantOptions = ['block', 'inline'] as const;
export type QuoteVariantPropType = (typeof quoteVariantOptions)[number];

/**
 * Defines the variant for presenting quotes.
 */
export type PropVariantQuote = {
	variant: QuoteVariantPropType;
};

const isQuoteVariantPropType = (value: unknown): value is QuoteVariantPropType => {
	return typeof value === 'string' && quoteVariantOptions.includes(value as QuoteVariantPropType);
};

export const validateVariantQuote = (component: Generic.Element.Component, value?: QuoteVariantPropType): void => {
	watchValidator(component, '_variant', isQuoteVariantPropType, new Set(quoteVariantOptions), value);
};
