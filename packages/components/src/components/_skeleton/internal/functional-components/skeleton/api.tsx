import type { CountProp, LabelProp, NameProp, ShowProp } from '../../schema/props';
import type { ComponentApi, InternalOf } from '../generic-types';

export interface SkeletonApi extends ComponentApi {
	Props: {
		Optional: CountProp;
		Required: NameProp;
	};
	States: InternalOf<CountProp> & LabelProp & ShowProp;
	Emitters: {
		loaded: number;
	};
	Methods: {
		focus: () => void;
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
