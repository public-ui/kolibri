import type { SimpleProp } from '../../../internal/props/helpers/factory';
import type { BadgeTextPropType, HideLabelPropType, KoliBriIconsProp, LabelWithExpertSlotPropType } from '../../../schema';
import type { ComponentApi } from '../generic-types';

export interface SpanApi extends ComponentApi {
	Props: {
		Required: {
			label: LabelWithExpertSlotPropType;
		};
		Optional: SimpleProp<'allowMarkdown', boolean> &
			SimpleProp<'badgeText', BadgeTextPropType> &
			SimpleProp<'hideLabel', HideLabelPropType> &
			SimpleProp<'icons', KoliBriIconsProp>;
	};
}
