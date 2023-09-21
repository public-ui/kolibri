import { Generic } from '@a11y-ui/core';

import { Stringified } from '../../types/common';
import { InputTypeOnDefault, Option } from '../../types/input/types';
import { Orientation } from '../../types/orientation';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { PropOptions } from '../../types/props/options';
import { W3CInputValue } from '../../types/w3c';
import { PropSyncValueBySelector } from '../../types/props/sync-value-by-selector';
import { PropDisabled } from '../../types/props/disabled';
import { PropHideLabel } from '../../types/props/hide-label';
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
	hint: string;
	/**
	 * @deprecated Use options.
	 */
	list: Stringified<Option<W3CInputValue>[]>;
	on: InputTypeOnDefault;
	orientation: Orientation;
	tabIndex: number;
	value: W3CInputValue;
} & PropDisabled &
	PropHideError &
	PropHideLabel &
	PropLabelWithExpertSlot &
	PropName &
	PropOptions & // PropOptions becomes required with 2.0
	PropRequired &
	PropSyncValueBySelector &
	PropTouched;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	options: Option<W3CInputValue>[];
	orientation: Orientation;
} & PropId &
	PropHideError &
	PropLabelWithExpertSlot;
type OptionalStates = {
	accessKey: string;
	alert: boolean;
	error: string;
	hint: string;
	on: InputTypeOnDefault;
	tabIndex: number;
	value: W3CInputValue;
} & PropDisabled &
	PropHideLabel &
	PropName &
	PropRequired &
	PropTouched;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type Watches = Generic.Element.Watchers<RequiredProps, Omit<OptionalProps, 'list'>>; // deprecated prop omitted

export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
