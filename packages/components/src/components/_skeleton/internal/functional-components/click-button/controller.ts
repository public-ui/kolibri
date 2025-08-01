import type { LabelProp, LabelPropType } from '../../schema/props/label';
import { normalizeLabel, validateLabel } from '../../schema/props/label';
import { BaseController } from '../base-controller';
import type { ControllerInterface, WebComponentInterface } from '../generic-types';
import type { ClickButtonCallbacks, ClickButtonEmitters, ClickButtonRefs, ClickButtonRenderDelegatedProps, ClickButtonRenderOwnProps } from './component';

export class ClickButtonController<Host extends WebComponentInterface<LabelProp, ClickButtonRenderOwnProps, ClickButtonEmitters>>
	extends BaseController<ClickButtonRenderDelegatedProps & ClickButtonRenderOwnProps, Host>
	implements ControllerInterface<ClickButtonRenderDelegatedProps, ClickButtonRenderOwnProps, ClickButtonCallbacks, ClickButtonRefs>
{
	private buttonRef?: HTMLButtonElement;

	public componentWillLoad(): void {
		const { _label } = this.component;
		this.watchLabel(_label);
	}

	public watchLabel(value?: LabelPropType): void {
		const normalized = normalizeLabel(value);
		if (validateLabel(normalized)) {
			this.setRenderPropsOrStates('label', normalized);
		}
	}

	public handleClick = (): void => {
		// eslint-disable-next-line no-console
		console.log(this, this.buttonRef, 'button clicked');
	};

	public setButtonRef = (element?: HTMLButtonElement): void => {
		this.buttonRef = element;
	};
}
