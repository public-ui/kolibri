import { Generic } from '@a11y-ui/core';

import { PropHref } from '../../types/props/href';

export type KoliBriQuoteVariant = 'block' | 'inline';

/**
 * API for the Quote component.
 */
type RequiredProps = {
	quote: string;
} & PropHref; // URL to the source of the quote (cite)
type OptionalProps = {
	caption: string;
	variant: KoliBriQuoteVariant;
};
export type KoliBriQuoteProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	quote: string;
	variant: KoliBriQuoteVariant;
} & PropHref; // URL to the source of the quote (cite)
type OptionalStates = {
	caption: string;
};
export type KoliBriQuoteStates = Generic.Element.Members<RequiredStates, OptionalStates>;

export type KoliBriQuoteApi = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
