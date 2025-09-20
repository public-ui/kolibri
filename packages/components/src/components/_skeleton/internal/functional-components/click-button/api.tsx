import type { LabelProp } from '../../schema/props/label';
import type { ComponentApi } from '../generic-types';

export interface ClickButtonApi extends ComponentApi {
	Props: LabelProp;
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
