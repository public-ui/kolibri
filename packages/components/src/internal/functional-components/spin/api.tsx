import type { LabelProp, ShowProp, VariantSpinProp } from '../../props';
import type { ComponentApi } from '../generic-types';

export interface SpinApi extends ComponentApi {
	Props: {
		Optional: ShowProp & LabelProp & VariantSpinProp;
	};
	States: {
		showToggled: boolean;
	};
}
