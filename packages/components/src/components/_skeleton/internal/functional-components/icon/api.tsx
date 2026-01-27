import type { IconsProp } from '../../schema/props/icons';
import type { LabelProp } from '../../schema/props/label';
import type { ComponentApi } from '../generic-types';

export interface IconApi extends ComponentApi {
	Props: {
		Required: IconsProp & LabelProp;
	};
}
