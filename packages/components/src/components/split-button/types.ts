import { Generic } from '@a11y-ui/core';
import { PropLabel } from '../../types/props';

export type KoliBriSplitButtonCallback = (e: Event, v: unknown) => void;

type RequiredProps = PropLabel;
type OptionalProps = { icon: string; onClick: KoliBriSplitButtonCallback; showDropdown: boolean };

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
