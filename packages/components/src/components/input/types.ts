import { Generic } from '@a11y-ui/core';

import { ButtonProps } from '../../types/button-link';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { PropAlert } from '../../types/props/alert';
import { PropDisabled } from '../../types/props/disabled';
import { PropHasCounter } from '../../types/props/has-counter';
import { PropHideLabel } from '../../types/props/hide-label';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { PropReadOnly } from '../../types/props/read-only';
import { PropRequired } from '../../types/props/required';
import { PropTouched } from '../../types/props/touched';

export type InputRequiredProps = PropLabelWithExpertSlot;

type RequiredProps = {
	id: string;
};
type OptionalProps = {
	currentLength: number;
	error: string;
	hint: string;
	icon: KoliBriHorizontalIcon;
	maxLength: number;
	slotName: string;
	smartButton: ButtonProps;
	syncValueBySelector: string;
} & PropAlert &
	PropDisabled &
	PropHasCounter &
	PropHideLabel &
	PropReadOnly &
	PropRequired &
	PropTouched;

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
