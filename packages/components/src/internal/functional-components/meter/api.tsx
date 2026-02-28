import type { LabelProp, MaxProp, MinProp, UnitProp, ValueProp } from '../../props';
import type { ComponentApi } from '../generic-types';

export interface MeterApi extends ComponentApi {
	Props: {
		Optional: MinProp & UnitProp;
		Required: LabelProp & MaxProp & ValueProp;
	};
	States: {
		liveValue: number;
	};
}
