import { Generic } from '@a11y-ui/core';

import { Props as ButtonProps } from '../button/types';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { InputNumberType, OptionalInputProps } from '../../types/input/control/number';
import { Iso8601 } from '../../types/input/iso8601';
import { InputTypeOnDefault, InputTypeOnOff } from '../../types/input/types';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { PropSuggestions, SuggestionsPropType } from '../../types/props/suggestions';
import { W3CInputValue } from '../../types/w3c';
import { PropSyncValueBySelector } from '../../types/props/sync-value-by-selector';
import { PropId } from '../../types/props/id';
import { PropDisabled } from '../../types/props/disabled';
import { PropHideLabel } from '../../types/props/hide-label';
import { PropName } from '../../types/props/name';
import { PropRequired } from '../../types/props/required';
import { PropReadOnly } from '../../types/props/read-only';
import { PropTouched } from '../../types/props/touched';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	placeholder: string;
	type: InputNumberType;
	/**
	 * @deprecated Use _suggestions instead.
	 */
	list: SuggestionsPropType;
} & OptionalInputProps<number | Iso8601> &
	PropSuggestions;

type RequiredStates = {
	autoComplete: InputTypeOnOff;
	hasValue: boolean;
	suggestions: W3CInputValue[];
	type: InputNumberType;
} & PropId &
	PropLabelWithExpertSlot;

type OptionalStates = {
	accessKey: string;
	alert: boolean;
	error: string;
	hint: string;
	icon: KoliBriHorizontalIcon;
	max: string;
	min: string;
	on: InputTypeOnDefault;
	placeholder: string;
	smartButton: ButtonProps;
	step: number;
	tabIndex: number;
	value: string;
} & PropDisabled &
	PropHideLabel &
	PropName &
	PropReadOnly &
	PropRequired &
	PropSyncValueBySelector &
	PropTouched;

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
