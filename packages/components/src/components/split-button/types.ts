import { Generic } from '@a11y-ui/core';
import { PropLabel } from '../../types/props';

export type KoliBriSplitButtonCallback = (e: Event) => void;

type RequiredProps = PropLabel;
type OptionalProps = { icon: string; on?: { onClick: KoliBriSplitButtonCallback }; showDropdown: boolean };

type RequiredStates = PropLabel & { showDropdown: boolean; on: { onClick?: KoliBriSplitButtonCallback } };
type OptionalStates = { icon: string };

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
