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
	id: string;
	suggestions: W3CInputValue[];
	type: InputDateType;
} & PropLabelWithExpertSlot;

type OptionalStates = {
	accessKey: string;
	alert: boolean;
	disabled: boolean;
	error: string;
	hideLabel: boolean;
	hint: string;
	icon: KoliBriHorizontalIcon;
	max: Iso8601;
	name: string;
	min: Iso8601;
	on: InputTypeOnDefault;
	placeholder: string;
	readOnly: boolean;
	required: boolean;
	smartButton: ButtonProps;
	step: number;
	tabIndex: number;
	touched: boolean;
	value: Iso8601 | null;
} & PropSyncValueBySelector;

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export type ComponentApi = Generic.Element.Members<RequiredProps, OptionalProps>;
