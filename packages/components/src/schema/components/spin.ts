import type { Generic } from 'adopted-style-sheets';

import type { SpinVariantType } from '../../internal/props';
import type { LabelPropType, ShowPropType } from '../props';

type RequiredSpinProps = NonNullable<unknown>;
type OptionalSpinProps = {
	label: LabelPropType;
	show: ShowPropType;
	variant: SpinVariantType;
};

export type SpinProps = Generic.Element.Members<RequiredSpinProps, OptionalSpinProps>;
