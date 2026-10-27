import type { Generic } from 'adopted-style-sheets';

import type { HeadingLevel, PropLabel } from '../props';
import type { PropDialogVariant } from '../props/variant/dialog';
import type { KoliBriModalEventCallbacks } from '../types';

type RequiredProps = PropLabel;
type OptionalProps = {
	on: KoliBriModalEventCallbacks;
	width: string;
	level?: HeadingLevel;
} & PropDialogVariant;
export type DialogProps = Generic.Element.Members<RequiredProps, OptionalProps>;
