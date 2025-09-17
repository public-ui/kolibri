import type { CountProp } from '../../schema/props/count';
import type { LabelProp } from '../../schema/props/label';
import type { NameProp } from '../../schema/props/name';
import type { ShowProp } from '../../schema/props/show';
import type { ComponentApi } from '../generic-types';

/**
 * Architectural hint for the typings
 *
 * Do not import Callbacks, Emitters, Refs, or State from
 * other components. Instead, define them here explicitly
 * and only if they are needed in this component.
 *
 * That makes it easier and possible to handle name collisions
 * and to keep the component self-contained.
 */

export interface SkeletonApi extends ComponentApi {
	Props: CountProp & NameProp;
	States: LabelProp & ShowProp;
	Emitters: {
		loaded: number;
	};
	Methods: {
		toggle: () => void;
	};
	Listeners: {
		keydown: KeyboardEvent;
	};
	Callbacks: {
		click: () => void;
	};
	Refs: {
		button: HTMLButtonElement;
	};
}
