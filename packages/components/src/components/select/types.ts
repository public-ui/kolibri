import { Generic } from '@a11y-ui/core';

import { Stringified } from '../../types/common';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { InputTypeOnDefault, SelectOption } from '../../types/input/types';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { PropOptionsWithOptgroup } from '../../types/props/options';
import { PropRows } from '../../types/props/rows';
import { W3CInputValue } from '../../types/w3c';
import { PropSyncValueBySelector } from '../../types/props/sync-value-by-selector';
import { PropDisabled } from '../../types/props/disabled';
import { PropHideLabel } from '../../types/props/hide-label';
import { PropMultiple } from '../../types/props/multiple';
import { PropName } from '../../types/props/name';
import { PropRequired } from '../../types/props/required';
import { PropTouched } from '../../types/props/touched';
import { PropId } from '../../types/props/id';
import { PropHideError } from '../../types/props/hide-error';

type RequiredProps = NonNullable<unknown>;
type OptionalProps = {
	accessKey: string;
	alert: boolean;
	error: string;
	/**
	 * @deprecated Use _rows instead.
	 */
	height: string;
	hint: string;
	icon: Stringified<KoliBriHorizontalIcon>;
	/**
	 * @deprecated Use options.
	 */
	list: Stringified<SelectOption<W3CInputValue>[]>;
	on: InputTypeOnDefault;
	/**
	 * @deprecated Use _rows instead.
	 */
	size: number;
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
	/**
	 * @deprecated Use _rows instead.
	 */
	height: string;
	hint: string;
	icon: KoliBriHorizontalIcon;
	on: InputTypeOnDefault;
	/**
	 * @deprecated Use _rows instead.
	 */
	size: number;
	tabIndex: number;
} & PropDisabled &
	PropHideLabel &
	PropId &
	PropName &
	PropRequired &
	PropRows &
	PropTouched;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type Watches = Generic.Element.Watchers<RequiredProps, Omit<OptionalProps, 'size' | 'list'>>; // deprecated props omitted

export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
