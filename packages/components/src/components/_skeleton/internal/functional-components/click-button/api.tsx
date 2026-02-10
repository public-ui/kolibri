import type { LabelProp } from '../../schema/props';
import type { ComponentApi } from '../generic-types';

export interface ClickButtonApi extends ComponentApi {
	Props: {
		Required: LabelProp;
	};
	Callbacks: {
		click: () => void;
	};
	Methods: {
		focus: () => void;
	};
	Refs: {
		button: HTMLButtonElement;
	};
}
