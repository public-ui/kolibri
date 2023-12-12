import { Generic } from 'adopted-style-sheets';

import { Stringified } from '../../types/common';
import { KoliBriCustomIcon, KoliBriIconsProp } from '../../types/icons';
import { PropHideLabel } from '../../types/props/hide-label';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { PropAccessKey } from '../../types/props/access-key';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	allowMarkdown: boolean;
	icons: Stringified<KoliBriIconsProp>;
} & PropHideLabel &
	PropAccessKey;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	allowMarkdown: boolean;
	icons: {
		top?: KoliBriCustomIcon;
		right?: KoliBriCustomIcon;
		bottom?: KoliBriCustomIcon;
		left?: KoliBriCustomIcon;
	};
} & PropLabelWithExpertSlot;
type OptionalStates = PropHideLabel & PropAccessKey;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
