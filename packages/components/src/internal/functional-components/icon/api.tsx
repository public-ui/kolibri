import type { IconsProp, LabelProp } from '../../props';
import type { ComponentApi } from '../generic-types';

export interface IconApi extends ComponentApi {
	Props: {
		Required: IconsProp & LabelProp;
	};
}
