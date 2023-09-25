import { Generic } from '@a11y-ui/core';

import { InputTypeOnDefault } from '../../types/input/types';
import { PropAdjustHeight } from '../../types/props/adjust-height';
import { PropDisabled } from '../../types/props/disabled';
import { PropHasCounter } from '../../types/props/has-counter';
import { PropHideError } from '../../types/props/hide-error';
import { PropHideLabel } from '../../types/props/hide-label';
import { PropId } from '../../types/props/id';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { PropName } from '../../types/props/name';
import { PropReadOnly } from '../../types/props/read-only';
import { PropRequired } from '../../types/props/required';
import { PropRows } from '../../types/props/rows';
import { PropSyncValueBySelector } from '../../types/props/sync-value-by-selector';
import { PropTouched } from '../../types/props/touched';

export type CSSResize = 'both' | 'horizontal' | 'vertical' | 'none';

type RequiredProps = NonNullable<unknown>;
type OptionalProps = {
	accessKey: string;
	alert: boolean;
	error: string;
	hint: string;
	maxLength: number;
	on: InputTypeOnDefault;
	placeholder: string;
	resize: CSSResize;
	tabIndex: number;
	value: string;
} & PropAdjustHeight &
	PropDisabled &
	PropHasCounter &
	PropHideError &
	PropHideLabel &
	PropLabelWithExpertSlot &
	PropName &
	PropReadOnly &
	PropRequired &
	PropRows &
	PropSyncValueBySelector &
	PropTouched;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	adjustHeight: boolean;
	currentLength: number;
	hasValue: boolean;
	resize: CSSResize;
} & PropId &
	PropAdjustHeight &
	PropHideError &
	PropLabelWithExpertSlot;
type OptionalStates = {
	accessKey: string;
	alert: boolean;
	error: string;
	hint: string;
	maxLength: number;
	on: InputTypeOnDefault;
	placeholder: string;
	tabIndex: number;
	value: string;
} & PropDisabled &
	PropHasCounter &
	PropHideLabel &
	PropName &
	PropReadOnly &
	PropRequired &
	PropRows &
	PropTouched;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
