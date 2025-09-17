import type { LabelProp } from '../../schema/props/label';
import type { ComponentApi } from '../generic-types';

export interface ClickButtonApi extends ComponentApi {
	Props: LabelProp;
	States: Record<never, never>;
	Emitters: Record<never, never>;
	Methods: Record<never, never>;
	Listeners: Record<never, never>;
	Callbacks: {
		click: () => void;
	};
	Refs: {
		button: HTMLButtonElement;
	};
}
