import type { NamePropType } from './schema/props/name';
import type { ShowPropType } from './schema/props/show';

export interface SkeletonState {
	nameState?: NamePropType;
	showState?: ShowPropType;
}
