import type { Generic } from 'adopted-style-sheets';

import type { OrientationPropType } from '../../internal/props';
import type {
	ClampedNumberValuePropType,
	HighPropType,
	LabelLangSegmentsPropType,
	LowPropType,
	MaxPropType,
	MinPropType,
	OptimumPropType,
	UnitPropType,
} from '../props';

type RequiredMeterProps = {
	label: LabelLangSegmentsPropType;
	value: ClampedNumberValuePropType;
};
type OptionalMeterProps = {
	high: HighPropType;
	low: LowPropType;
	max: MaxPropType;
	min: MinPropType;
	optimum: OptimumPropType;
	orientation: OrientationPropType;
	unit: UnitPropType;
};

export type MeterProps = Generic.Element.Members<RequiredMeterProps, OptionalMeterProps>;
