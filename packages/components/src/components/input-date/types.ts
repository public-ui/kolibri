import { Generic } from '@a11y-ui/core';

import { Props as ButtonProps } from '../button/types';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { InputDateType, OptionalInputProps } from '../../types/input/control/number';
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
import { PropReadOnly } from '../../types/props/read-only';
import { PropRequired } from '../../types/props/required';
import { PropTouched } from '../../types/props/touched';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	type: InputDateType;

	/**
	 * @deprecated Use _suggestions instead.
	 */
	list: SuggestionsPropType;
} & OptionalInputProps<Iso8601 | Date> &
	PropSuggestions;

type RequiredStates = {
	autoComplete: InputTypeOnOff;
	hasValue: boolean;
	suggestions: W3CInputValue[];
	type: InputDateType;
} & PropLabelWithExpertSlot &
	PropId;

type OptionalStates = {
	accessKey: string;
	alert: boolean;
	error: string;
	hint: string;
	icon: KoliBriHorizontalIcon;
	max: Iso8601;
	min: Iso8601;
	on: InputTypeOnDefault;
	placeholder: string;
	smartButton: ButtonProps;
	step: number;
	tabIndex: number;
	value: Iso8601 | null;
} & PropSyncValueBySelector &
	PropDisabled &
	PropHideLabel &
	PropName &
	PropReadOnly &
	PropRequired &
	PropTouched;

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export type ComponentApi = Generic.Element.Members<RequiredProps, OptionalProps>;
