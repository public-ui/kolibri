import { Generic } from '@a11y-ui/core';

export type KoliBriQuoteVariant = 'block' | 'inline';

type RequiredProps = {
	href: string; // URL to the source of the quote (cite)
	quote: string;
};
type OptionalProps = {
	caption: string;
	variant: KoliBriQuoteVariant;
};

type RequiredStates = {
	href: string; // URL to the source of the quote (cite)
	quote: string;
	variant: KoliBriQuoteVariant;
};
type OptionalStates = {
	caption: string;
};
export type KoliBriQuoteStates = Generic.Element.Members<RequiredStates, OptionalStates>;

export type KoliBriQuoteApi = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
