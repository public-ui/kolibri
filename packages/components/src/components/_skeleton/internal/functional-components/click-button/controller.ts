import type { LabelPropType } from '../../schema/props/label';
import { normalizeLabel, validateLabel } from '../../schema/props/label';
import { BaseController } from '../base-controller';
import type { ControllerInterface } from '../generic-types';
import type { ClickButtonApi } from './api';

export class ClickButtonController extends BaseController<ClickButtonApi['Props'], ClickButtonApi['States']> implements ControllerInterface<ClickButtonApi> {
	private buttonRef?: HTMLButtonElement;

	public constructor(states: ClickButtonApi['States']) {
		super(states, {
			label: '',
		});
	}

	public componentWillLoad(props: ClickButtonApi['Props']): void {
		const { label } = props;
		this.watchLabel(label);
	}

	public watchLabel(value?: LabelPropType): void {
		const normalized = normalizeLabel(value);
		if (validateLabel(normalized)) {
			this.setProp('label', normalized);
		}
	}

	public handleClick = (): void => {
		// eslint-disable-next-line no-console
		console.log(this, this.buttonRef, 'button clicked');
	};

	public focusButton = (): void => {
		this.buttonRef?.focus();
	};

	public setButtonRef = (element?: HTMLButtonElement): void => {
		this.buttonRef = element;
	};
}
