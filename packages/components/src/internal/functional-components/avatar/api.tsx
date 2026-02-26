import type { ColorProp, InitialsProp, LabelProp, SrcProp } from '../../props';
import type { ComponentApi } from '../generic-types';

export interface AvatarApi extends ComponentApi {
	Props: {
		Optional: SrcProp & ColorProp;
		Required: LabelProp;
	};
	States: InitialsProp;
}
