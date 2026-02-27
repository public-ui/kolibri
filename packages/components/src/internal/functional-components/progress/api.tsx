import type { LabelProp, MaxProp, UnitProp, ValueProp, VariantProgressProp } from '../../props';
import type { ComponentApi, InternalOf } from '../generic-types';

export interface ProgressApi extends ComponentApi {
	Props: {
		Optional: LabelProp & UnitProp & VariantProgressProp;
		Required: MaxProp & ValueProp;
	};
	States: InternalOf<UnitProp> &
		InternalOf<VariantProgressProp> & {
			liveValue: number;
		};
}
