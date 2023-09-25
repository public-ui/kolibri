import { Generic } from '@a11y-ui/core';

import { Stringified } from '../../types/common';
import { InputTypeOnDefault, Option } from '../../types/input/types';
import { Orientation } from '../../types/orientation';
import { PropDisabled } from '../../types/props/disabled';
import { PropHideError } from '../../types/props/hide-error';
import { PropHideLabel } from '../../types/props/hide-label';
import { PropId } from '../../types/props/id';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { PropName } from '../../types/props/name';
import { PropOptions } from '../../types/props/options';
import { PropRequired } from '../../types/props/required';
import { PropSyncValueBySelector } from '../../types/props/sync-value-by-selector';
import { PropTouched } from '../../types/props/touched';
import { W3CInputValue } from '../../types/w3c';

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
