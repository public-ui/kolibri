import { Generic } from '@a11y-ui/core';

import { Stringified } from '../../types/common';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { InputTypeOnDefault, InputTypeOnOff } from '../../types/input/types';
import { PropDisabled } from '../../types/props/disabled';
import { PropHideError } from '../../types/props/hide-error';
import { PropHideLabel } from '../../types/props/hide-label';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { PropName } from '../../types/props/name';
import { PropSuggestions, SuggestionsPropType } from '../../types/props/suggestions';
import { PropSyncValueBySelector } from '../../types/props/sync-value-by-selector';
import { PropTouched } from '../../types/props/touched';
import { W3CInputValue } from '../../types/w3c';
import { Props as ButtonProps } from '../button/types';

type RequiredProps = NonNullable<unknown>;
type OptionalProps = {
	accessKey: string;
	alert: boolean;
	autoComplete: InputTypeOnOff;
	error: string;
	hint: string;
	icon: Stringified<KoliBriHorizontalIcon>;
	/**
	 * @deprecated Use _suggestions instead.
	 */
	list: SuggestionsPropType;
	on: InputTypeOnDefault;
	smartButton: Stringified<ButtonProps>;
	tabIndex: number;
	value: string;
} & PropDisabled &
	PropHideError &
	PropHideLabel &
	PropLabelWithExpertSlot &
	PropName &
	PropSuggestions &
	PropSyncValueBySelector &
	PropTouched;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	autoComplete: InputTypeOnOff;
	id: string;
	suggestions: W3CInputValue[];
} & PropHideError &
	PropLabelWithExpertSlot;
type OptionalStates = {
	accessKey: string;
	alert: boolean;
	error: string;
	hint: string;
	icon: KoliBriHorizontalIcon;
	on: InputTypeOnDefault;
	smartButton: ButtonProps;
	tabIndex: number;
	value: string;
} & PropDisabled &
	PropHideLabel &
	PropName &
	PropTouched;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
