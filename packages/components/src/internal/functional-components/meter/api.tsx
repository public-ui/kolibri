import type { LabelProp, MaxProp, MinProp, UnitProp, ValueProp } from '../../props';
import type { ComponentApi, InternalOf } from '../generic-types';

export interface MeterApi extends ComponentApi {
	Props: {
		Optional: UnitProp & MinProp;
		Required: LabelProp & MaxProp & ValueProp;
	};
	States: InternalOf<UnitProp> & {
		liveValue: number;
	};
}
