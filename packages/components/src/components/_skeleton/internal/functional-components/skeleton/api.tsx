import type { CountProp } from '../../schema/props/count';
import type { LabelProp } from '../../schema/props/label';
import type { NameProp } from '../../schema/props/name';
import type { ShowProp } from '../../schema/props/show';
import type { ComponentApi } from '../generic-types';

export interface SkeletonApi extends ComponentApi {
	Props: CountProp & NameProp;
	States: LabelProp & ShowProp;
	Emitters: {
		loaded: number;
	};
	Methods: {
		toggle: () => Promise<void>;
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
