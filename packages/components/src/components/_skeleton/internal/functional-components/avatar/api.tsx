import type { ColorProp, InitialsProp, LabelProp, SrcProp } from '../../schema/props';
import type { ComponentApi } from '../generic-types';

export interface AvatarApi extends ComponentApi {
	Props: {
		Optional: SrcProp;
		Required: LabelProp & ColorProp;
	};
	States: InitialsProp;
}
