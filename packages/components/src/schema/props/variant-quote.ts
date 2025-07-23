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

export const validateVariantQuote = (component: Generic.Element.Component, value?: QuoteVariantPropType): void => {
	watchValidator(component, '_variant', (value) => typeof value === 'string' && quoteVariantOptions.includes(value), new Set(quoteVariantOptions), value);
};
