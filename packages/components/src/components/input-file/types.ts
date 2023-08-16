import { Generic } from '@a11y-ui/core';

import { Props as ButtonProps } from '../button/types';
import { Stringified } from '../../types/common';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { InputTypeOnDefault } from '../../types/input/types';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { PropSyncValueBySelector } from '../../types/props/sync-value-by-selector';
import { PropDisabled } from '../../types/props/disabled';
import { PropHideLabel } from '../../types/props/hide-label';
import { PropMultiple } from '../../types/props/multiple';
import { PropName } from '../../types/props/name';
import { PropRequired } from '../../types/props/required';
import { PropTouched } from '../../types/props/touched';
import { PropId } from '../../types/props/id';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	accept: string;
	alert: boolean;
	accessKey: string;
	error: string;
	hint: string;
	icon: Stringified<KoliBriHorizontalIcon>;
	on: InputTypeOnDefault;
	smartButton: Stringified<ButtonProps>;
	tabIndex: number;
	value: string;
} & PropDisabled &
	PropHideLabel &
	PropMultiple &
	PropName &
	PropRequired &
	PropSyncValueBySelector &
	PropTouched;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = PropId & PropLabelWithExpertSlot;
type OptionalStates = {
	accept: string;
	alert: boolean;
	accessKey: string;
	error: string;
	hint: string;
	icon: KoliBriHorizontalIcon;
	on: InputTypeOnDefault;
	smartButton: ButtonProps;
	tabIndex: number;
	value: string;
} & PropDisabled &
	PropHideLabel &
	PropMultiple &
	PropName &
	PropRequired &
	PropTouched;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
