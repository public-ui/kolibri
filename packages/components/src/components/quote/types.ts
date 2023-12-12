import type { Generic } from 'adopted-style-sheets';

import { PropHref } from '../../types/props/href';
import { PropLabel } from '../../types/props/label';

export type KoliBriQuoteVariant = 'block' | 'inline';

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
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	quote: string;
	variant: KoliBriQuoteVariant;
} & PropHref; // URL to the source of the quote (cite)
type OptionalStates = PropLabel;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
