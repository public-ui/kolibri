import { labelProp, type LabelPropType } from '../../schema/props/label';
import { BaseController } from '../base-controller';
import type { ControllerInterface, ResolvedProps } from '../generic-types';
import type { ClickButtonApi } from './api';

export class ClickButtonController
	extends BaseController<ResolvedProps<ClickButtonApi>, ClickButtonApi['States']>
	implements ControllerInterface<ClickButtonApi>
{
	private buttonRef?: HTMLButtonElement;

	public constructor(states: ClickButtonApi['States'] = {}) {
		super(states, {
			label: '',
		});
	}

	public componentWillLoad(props: ResolvedProps<ClickButtonApi>): void {
		const { label } = props;
		this.watchLabel(label);
	}

	public watchLabel(value?: LabelPropType): void {
		const normalized = labelProp.normalize(value);
		if (labelProp.validate(normalized)) {
			this.setProp('label', normalized);
		}
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
