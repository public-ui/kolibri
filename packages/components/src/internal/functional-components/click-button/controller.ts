import type { LabelProp } from '../../props';
import { labelProp, withValidPropValue } from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, ResolvedInputProps } from '../generic-types';
import type { ClickButtonApi } from './api';

export class ClickButtonController extends BaseController<ClickButtonApi> implements ControllerInterface<ClickButtonApi> {
	private buttonRef?: HTMLButtonElement;

	public constructor(states: ClickButtonApi['States'] = {}) {
		super(states, {
			label: '',
		});
	}

	public componentWillLoad(props: ResolvedInputProps<ClickButtonApi>): void {
		const { label } = props;
		this.watchLabel(label);
	}

	public watchLabel(value?: string): void {
		withValidPropValue<LabelProp>(labelProp, value, (v) => {
			this.setProp('label', v);
		});
	}

	public handleClick = (): void => {
		// eslint-disable-next-line no-console
		console.log(this, this.buttonRef, 'button clicked');
	};

	public focus(): void {
		this.buttonRef?.focus();
	}

	public setButtonRef = (element?: HTMLButtonElement): void => {
		this.buttonRef = element;
	};
}
