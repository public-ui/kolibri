import type { LabelProp, MaxProp, NumberValueProp, UnitProp, VariantProgressProp } from '../../props';
import type { ComponentApi } from '../generic-types';

export interface ProgressApi extends ComponentApi {
	Props: {
		Optional: LabelProp & UnitProp & VariantProgressProp;
		Required: MaxProp & NumberValueProp;
	};
	States: {
		liveValue: number;
	};
}
