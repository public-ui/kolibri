import type { Generic } from 'adopted-style-sheets';

import type { HeadingLevel, PropHasCloser, PropHref, PropLabel, PropLinkTarget } from '../props';
import type { EventCallback } from '../types';

export type KoliBriCardEventCallbacks = {
	onClose?: EventCallback<Event>;
	onFocus?: EventCallback<FocusEvent>;
	onBlur?: EventCallback<FocusEvent>;
};

type RequiredProps = PropLabel;
type OptionalProps = {
	level: HeadingLevel;
	on: KoliBriCardEventCallbacks;
} & PropHasCloser &
	PropHref &
	PropLinkTarget;

export type CardProps = Generic.Element.Members<RequiredProps, OptionalProps>;
