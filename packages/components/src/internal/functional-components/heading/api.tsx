import type { LabelWithExpertSlotProp, LevelProp, SecondaryHeadlineProp } from '../../props';
import type { ComponentApi } from '../generic-types';

export interface HeadingApi extends ComponentApi {
	Props: {
		Optional: LevelProp & SecondaryHeadlineProp;
		Required: LabelWithExpertSlotProp;
	};
}
