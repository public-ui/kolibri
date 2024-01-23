import type { Generic } from 'adopted-style-sheets';
import type { PropLabel, PropTooltipAlign } from '../props';

type RequiredProps = PropLabel;
type OptionalProps = PropTooltipAlign;

type RequiredStates = RequiredProps & OptionalProps;
type OptionalStates = NonNullable<unknown>;

export type AbbrProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type AbbrStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type AbbrAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
