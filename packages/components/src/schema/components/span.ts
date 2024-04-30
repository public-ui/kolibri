import type { Generic } from 'adopted-style-sheets';

import type { PropAccessKey, PropHideLabel, PropLabelWithExpertSlot } from '../props';
import type { KoliBriCustomIcon, KoliBriIconsProp, Stringified } from '../types';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	allowMarkdown: boolean;
	icons: Stringified<KoliBriIconsProp>;
} & PropHideLabel &
	PropAccessKey;

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

export type SpanProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type SpanStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type SpanAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
