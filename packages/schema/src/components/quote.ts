import type { Generic } from 'adopted-style-sheets';

import type { PropHref, PropLabel } from '../props';

export const koliBriQuoteVariantOptions = ['block', 'inline'] as const;
export type KoliBriQuoteVariant = (typeof koliBriQuoteVariantOptions)[number];

type RequiredProps = {
	quote: string;
} & PropHref; // URL to the source of the quote (cite)
type OptionalProps = {
	variant: KoliBriQuoteVariant;
} & PropLabel;

type RequiredStates = {
	quote: string;
	variant: KoliBriQuoteVariant;
} & PropHref; // URL to the source of the quote (cite)
type OptionalStates = PropLabel;

export type QuoteProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type QuoteStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type QuoteAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
