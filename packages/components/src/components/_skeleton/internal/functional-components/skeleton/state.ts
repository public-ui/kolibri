import type { NamePropType } from './schema/props/name';
import type { ShowPropType } from './schema/props/show';

/**
 * The component state is shared with the functional component. Keeping the
 * interface here allows both the controller and the Stencil component to
 * reuse it. The BaseController#setState method relies on this type and is
 * therefore public.
 */

export interface SkeletonState {
	nameState?: NamePropType;
	showState?: ShowPropType;
}
