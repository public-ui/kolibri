import { Events } from '../enums/events';
import { EventValueOrEventCallback } from './callbacks';
import { OptionalProps as LinkOptionalProps } from '../components/link/types';
import { OptionalButtonProps, RequiredButtonProps, RequiredButtonStates, OptionalButtonStates } from '../components/button/types';
import { Stringified } from './common';
import { StencilUnknown } from './unknown';
import { PropDisabled } from './props/disabled';
import { PropId } from './props/id';
import { PropLabelWithExpertSlot } from './props/label';
import { PropName } from './props/name';
import { PropButtonType } from './props/button-type';
import { PropButtonCallbacks } from './props/button-callbacks';
import { Generic } from '@a11y-ui/core';

/**
 * API ButtonLink
 */
export type RequiredButtonLinkProps = unknown;
export type OptionalButtonLinkProps = OptionalButtonProps &
	Omit<LinkOptionalProps, 'on'> & {
		/**
		 * @deprecated Zweck?!
		 */
		accessKey: string;
		syncValueBySelector: string;
		value: Stringified<StencilUnknown>;
	} & PropDisabled &
	PropId &
	PropLabelWithExpertSlot &
	PropName &
	PropButtonType &
	PropButtonCallbacks<StencilUnknown>;
export type ButtonLinkProps = Generic.Element.Members<RequiredButtonProps, OptionalButtonProps>;
export type ButtonLinkStates = Generic.Element.Members<RequiredButtonStates, OptionalButtonStates>;

/* LINK */

/**
 * @deprecated Link should not use the on-click event. Use a button instead.
 */
export type LinkOnCallbacks = {
	[Events.onClick]?: EventValueOrEventCallback<Event, string>;
};

/**
 * @deprecated Will be removed in next major release.
 */
export type LinkUseCase = 'text' | 'image' | 'nav';
