import { Generic } from '@a11y-ui/core';

import { Props as ButtonProps } from '../button/types';
import { Stringified } from '../../types/common';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { PropAlert } from '../../types/props/alert';
import { PropDisabled } from '../../types/props/disabled';
import { PropHasCounter } from '../../types/props/has-counter';
import { PropHideLabel } from '../../types/props/hide-label';
import { PropReadOnly } from '../../types/props/read-only';
import { PropRequired } from '../../types/props/required';
import { PropSuggestions } from '../../types/props/suggestions';
import { PropTouched } from '../../types/props/touched';
import { PropSyncValueBySelector } from '../../types/props/sync-value-by-selector';
import { PropId } from '../../types/props/id';
import { PropHideError } from '../../types/props/hide-error';

type RequiredProps = PropId;
type OptionalProps = {
	currentLength: number;
	error: string;
	hint: string;
	icon: KoliBriHorizontalIcon;
	maxLength: number;
	slotName: string;
	smartButton: Stringified<ButtonProps>;
} & PropAlert &
	PropDisabled &
	PropHasCounter &
	PropHideError &
	PropHideLabel &
	PropReadOnly &
	PropRequired &
	PropSuggestions &
	PropSyncValueBySelector &
	PropTouched;

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
