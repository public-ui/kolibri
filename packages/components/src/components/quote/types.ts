import { Generic } from '@a11y-ui/core';

export type KoliBriQuoteVariant = 'block' | 'inline';

/**
 * API for the Quote component.
 */
type RequiredProps = {
	cite: string;
	quote: string;
};
type OptionalProps = {
	caption: string;
	variant: KoliBriQuoteVariant;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	cite: string;
	quote: string;
	variant: KoliBriQuoteVariant;
};
type OptionalStates = {
	caption: string;
};
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type ComponentApi = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
