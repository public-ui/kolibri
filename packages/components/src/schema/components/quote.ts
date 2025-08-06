import type { Generic } from 'adopted-style-sheets';

import type { PropHref, PropLabel, PropVariantQuote } from '../props';

type RequiredProps = {
	quote: string;
} & PropHref; // URL to the source of the quote (cite)
type OptionalProps = PropLabel & PropVariantQuote;

type RequiredStates = {
	quote: string;
} & PropHref &
	PropVariantQuote; // URL to the source of the quote (cite)
type OptionalStates = PropLabel;

export type QuoteProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type QuoteStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type QuoteAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
