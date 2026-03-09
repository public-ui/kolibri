import type { NameProp } from '../../props';
import type { ComponentApi } from '../generic-types';

export interface SkeletonApi extends ComponentApi {
	Props: {
		Required: NameProp;
	};
	States: {
		count: number;
		label: string;
		show: boolean;
	};
	Emitters: {
		loaded: number;
		rendered: void;
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
