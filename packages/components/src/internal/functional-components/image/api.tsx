import type { AltProp, LoadingProp, SizesProp, SrcProp, SrcsetProp } from '../../props';
import type { ComponentApi } from '../generic-types';

export interface ImageApi extends ComponentApi {
	Props: {
		Required: AltProp & SrcProp;
		Optional: LoadingProp & SizesProp & SrcsetProp;
	};
}
