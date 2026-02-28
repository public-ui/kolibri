import type { LabelProp, MaxProp, MinProp, UnitProp, ValueProp } from '../../props';
import type { ComponentApi, InternalOf } from '../generic-types';

export interface MeterApi extends ComponentApi {
	Props: {
		Optional: MinProp;
		Required: LabelProp & MaxProp & UnitProp & ValueProp;
	};
	States: InternalOf<UnitProp> & {
		liveValue: number;
	};
}
