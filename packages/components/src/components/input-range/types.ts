import { Generic } from '@a11y-ui/core';

import { Stringified } from '../../types/common';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { InputTypeOnDefault, InputTypeOnOff, Option } from '../../types/input/types';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { PropSuggestions } from '../../types/props/suggestions';
import { W3CInputValue } from '../../types/w3c';
import { PropSyncValueBySelector } from '../../types/props/sync-value-by-selector';
import { PropDisabled } from '../../types/props/disabled';
import { PropHideLabel } from '../../types/props/hide-label';
import { PropName } from '../../types/props/name';
import { PropTouched } from '../../types/props/touched';
import { PropId } from '../../types/props/id';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	accessKey: string;
	alert: boolean;
	autoComplete: InputTypeOnOff;
	error: string;
	hint: string;
	icon: Stringified<KoliBriHorizontalIcon>;
	/**
	 * @deprecated Use suggestions instead.
	 */
	list: Stringified<Option<W3CInputValue>[]>;
	max: number;
	min: number;
	on: InputTypeOnDefault;
	step: number;
	tabIndex: number;
	value: number;
} & PropDisabled &
	PropHideLabel &
	PropName &
	PropSuggestions &
	PropSyncValueBySelector &
	PropTouched;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	autoComplete: InputTypeOnOff;
	suggestions: W3CInputValue[];
} & PropId &
	PropLabelWithExpertSlot;
type OptionalStates = {
	accessKey: string;
	alert: boolean;
	error: string;
	hint: string;
	icon: KoliBriHorizontalIcon;
	max: number;
	min: number;
	on: InputTypeOnDefault;
	step: number;
	tabIndex: number;
	value: number;
} & PropDisabled &
	PropHideLabel &
	PropName &
	PropTouched;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
