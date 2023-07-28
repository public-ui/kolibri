import { Generic } from '@a11y-ui/core';

import { PropHref } from '../../types/props/href';
import { PropLabel } from '../../types/props/label';

export type KoliBriQuoteVariant = 'block' | 'inline';

/**
 * API for the Quote component.
 */
type RequiredProps = {
	quote: string;
} & PropHref; // URL to the source of the quote (cite)
type OptionalProps = {
	/**
	 * @deprecated use label.
	 */
	caption: string;
	variant: KoliBriQuoteVariant;
} & PropLabel;
export type KoliBriQuoteProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	quote: string;
	variant: KoliBriQuoteVariant;
} & PropHref; // URL to the source of the quote (cite)
type OptionalStates = PropLabel;
export type KoliBriQuoteStates = Generic.Element.Members<RequiredStates, OptionalStates>;

export type KoliBriQuoteApi = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
