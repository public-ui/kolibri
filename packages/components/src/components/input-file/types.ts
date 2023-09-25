import { Generic } from '@a11y-ui/core';

import { Stringified } from '../../types/common';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { InputTypeOnDefault } from '../../types/input/types';
import { PropDisabled } from '../../types/props/disabled';
import { PropHideError } from '../../types/props/hide-error';
import { PropHideLabel } from '../../types/props/hide-label';
import { PropId } from '../../types/props/id';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { PropMultiple } from '../../types/props/multiple';
import { PropName } from '../../types/props/name';
import { PropRequired } from '../../types/props/required';
import { PropSyncValueBySelector } from '../../types/props/sync-value-by-selector';
import { PropTouched } from '../../types/props/touched';
import { Props as ButtonProps } from '../button/types';

type RequiredProps = NonNullable<unknown>;
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
	PropHideError &
	PropHideLabel &
	PropLabelWithExpertSlot &
	PropMultiple &
	PropName &
	PropRequired &
	PropSyncValueBySelector &
	PropTouched;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = PropId & PropLabelWithExpertSlot & PropHideError;
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
