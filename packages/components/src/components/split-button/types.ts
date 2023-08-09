import { Generic } from '@a11y-ui/core';

import { PropLabel } from '../../types/props/label';
import { PropAlternativeButtonLinkRole } from '../../types/props/alternative-button-link-role';
import { PropTooltipAlign } from '../../types/props/tooltip-align';
import { PropButtonVariant } from '../../types/props/button-variant';

export type KoliBriSplitButtonCallback = (e: Event) => void;

type RequiredProps = PropLabel;
type OptionalProps = { icon: string; on?: { onClick: KoliBriSplitButtonCallback }; showDropdown: boolean } & PropAlternativeButtonLinkRole &
	PropTooltipAlign &
	PropButtonVariant;

type RequiredStates = PropLabel & { showDropdown: boolean; on: { onClick?: KoliBriSplitButtonCallback } };
type OptionalStates = { icon: string };

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
