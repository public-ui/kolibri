import type { Generic } from 'adopted-style-sheets';

import type { HeadingLevel, PropAlign, PropHasCloser, PropLabel, PropOpen } from '../props';
import type { KoliBriModalEventCallbacks } from '../types';

type RequiredProps = PropLabel;
type OptionalProps = PropAlign &
	PropHasCloser &
	PropOpen & {
		level?: HeadingLevel;
		on: KoliBriModalEventCallbacks;
	};

export type DrawerProps = Generic.Element.Members<RequiredProps, OptionalProps>;
