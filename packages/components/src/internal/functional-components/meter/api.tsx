import type { HighProp, LabelProp, LowProp, MaxProp, MinProp, OptimumProp, OrientationProp, UnitProp, ValueProp } from '../../props';
import type { ComponentApi } from '../generic-types';

export interface MeterApi extends ComponentApi {
	Props: {
		Optional: HighProp & LowProp & MinProp & OptimumProp & OrientationProp & UnitProp;
		Required: LabelProp & MaxProp & ValueProp;
	};
	States: {
		liveValue: number;
	};
}
