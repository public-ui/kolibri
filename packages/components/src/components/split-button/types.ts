import { Generic } from '@a11y-ui/core';

import { PropLabel } from '../../types/props/label';

export type KoliBriSplitButtonCallback = (e: Event) => void;

type RequiredProps = PropLabel;
type OptionalProps = { icon: string; on?: { onClick: KoliBriSplitButtonCallback }; showDropdown: boolean };

type RequiredStates = PropLabel & { showDropdown: boolean; on: { onClick?: KoliBriSplitButtonCallback } };
type OptionalStates = { icon: string };

export type KoliBriSplitButtonAStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriSplitButtonAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
