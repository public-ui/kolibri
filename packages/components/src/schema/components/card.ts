import type { Generic } from 'adopted-style-sheets';

import type { HeadingLevel, PropHasCloser, PropHref, PropLabelLangSegments, PropLinkTarget } from '../props';
import type { EventCallback } from '../types';

export type KoliBriCardEventCallbacks = {
	onClose?: EventCallback<Event>;
	onFocus?: EventCallback<FocusEvent>;
	onBlur?: EventCallback<FocusEvent>;
};

type RequiredProps = PropLabelLangSegments;
type OptionalProps = {
	level: HeadingLevel;
	on: KoliBriCardEventCallbacks;
} & PropHasCloser &
	PropHref &
	PropLinkTarget;

export type CardProps = Generic.Element.Members<RequiredProps, OptionalProps>;
