import type { LabelProp, MaxProp, MinProp, UnitProp, ValueProp, VariantProgressProp } from '../../props';
import type { ComponentApi, InternalOf } from '../generic-types';

export interface MeterApi extends ComponentApi {
	Props: {
		Optional: LabelProp & UnitProp & MinProp;
		Required: MaxProp & ValueProp;
	};
	States: InternalOf<UnitProp> &
		InternalOf<VariantProgressProp> & {
			liveValue: number;
		};
}
