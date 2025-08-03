import type { LabelPropType } from '../../schema/props/label';
import { normalizeLabel, validateLabel } from '../../schema/props/label';
import { BaseController } from '../base-controller';
import type { ControllerInterface, WebComponentInterface } from '../generic-types';
import type { ClickButtonCallbacks, ClickButtonRefs, ClickButtonRenderProps } from './component';

export class ClickButtonController<Host extends WebComponentInterface<ClickButtonRenderProps>>
	extends BaseController<Host>
	implements ControllerInterface<ClickButtonRenderProps, ClickButtonCallbacks, ClickButtonRefs>
{
	private buttonRef?: HTMLButtonElement;

	public componentWillLoad(props: ClickButtonRenderProps): void {
		const { label } = props;
		this.watchLabel(label);
	}

	public watchLabel(value?: LabelPropType): void {
		if (validateLabel(value)) {
			this.setRenderPropsOrStates('label', value);
		} else {
			const normalized = normalizeLabel(value);
			if (validateLabel(normalized)) {
				this.setRenderPropsOrStates('label', normalized);
			}
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
