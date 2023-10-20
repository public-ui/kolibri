import { Generic } from '@a11y-ui/core';

import { Stringified } from '../../types/common';
import { KoliBriHorizontalIcons } from '../../types/icons';
import { InputTypeOnDefault, SelectOption } from '../../types/input/types';
import { PropDisabled } from '../../types/props/disabled';
import { PropHideError } from '../../types/props/hide-error';
import { PropHideLabel } from '../../types/props/hide-label';
import { PropId } from '../../types/props/id';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { PropMultiple } from '../../types/props/multiple';
import { PropName } from '../../types/props/name';
import { PropOptionsWithOptgroup } from '../../types/props/options';
import { PropRequired } from '../../types/props/required';
import { PropRows } from '../../types/props/rows';
import { PropSyncValueBySelector } from '../../types/props/sync-value-by-selector';
import { PropTouched } from '../../types/props/touched';
import { W3CInputValue } from '../../types/w3c';

type RequiredProps = NonNullable<unknown>;
type OptionalProps = {
	accessKey: string;
	alert: boolean;
	error: string;
	hint: string;
	icons: Stringified<KoliBriHorizontalIcons>;
	on: InputTypeOnDefault;
	tabIndex: number;
	value: Stringified<W3CInputValue[]>;
} & PropDisabled &
	PropHideLabel &
	PropHideError &
	PropLabelWithExpertSlot &
	PropMultiple &
	PropName &
	PropOptionsWithOptgroup & // PropOptionsWithOptgroup becomes required with 2.0
	PropRequired &
	PropRows &
	PropSyncValueBySelector &
	PropTouched;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	hasValue: boolean;
	options: SelectOption<W3CInputValue>[];
	value: W3CInputValue[];
} & PropId &
	PropHideError &
	PropMultiple &
	PropLabelWithExpertSlot;
type OptionalStates = {
	accessKey: string;
	alert: boolean;
	error: string;
	hint: string;
	icons: KoliBriHorizontalIcons;
	on: InputTypeOnDefault;
	tabIndex: number;
} & PropDisabled &
	PropHideLabel &
	PropId &
	PropName &
	PropRequired &
	PropRows &
	PropTouched;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
