import type { LabelProp, MaxProp, UnitProp, NumberValueProp, VariantProgressProp } from '../../props';
import type { ComponentApi, InternalOf } from '../generic-types';

export interface ProgressApi extends ComponentApi {
	Props: {
		Optional: LabelProp & UnitProp & VariantProgressProp;
		Required: MaxProp & NumberValueProp;
	};
	States: InternalOf<UnitProp> &
		InternalOf<VariantProgressProp> & {
			liveValue: number;
			max: number;
		};
}
