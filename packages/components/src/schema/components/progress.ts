import type { Generic } from 'adopted-style-sheets';

import type { ProgressVariantType } from '../../internal/props';
import type { ClampedNumberValuePropType, LabelLangSegmentsPropType, MaxPropType, UnitPropType } from '../props';

type RequiredProgressProps = {
	max: MaxPropType;
	value: ClampedNumberValuePropType;
};
type OptionalProgressProps = {
	label: LabelLangSegmentsPropType;
	unit: UnitPropType;
	variant: ProgressVariantType;
};

export type ProgressProps = Generic.Element.Members<RequiredProgressProps, OptionalProgressProps>;
