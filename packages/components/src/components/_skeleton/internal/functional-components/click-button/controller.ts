import type { LabelPropType } from '../../schema/props/label';
import { normalizeLabel, validateLabel } from '../../schema/props/label';
import { BaseController } from '../base-controller';
import type { ControllerInterface } from '../generic-types';
import type { ClickButtonCallbacks, ClickButtonRefs, ClickButtonRenderDelegatedProps, ClickButtonRenderOwnProps } from './component';

export class ClickButtonController<Props extends ClickButtonRenderDelegatedProps & ClickButtonRenderOwnProps>
	extends BaseController<Props>
	implements ControllerInterface<ClickButtonRenderDelegatedProps, ClickButtonRenderOwnProps, ClickButtonCallbacks, ClickButtonRefs>
{
	private buttonRef?: HTMLButtonElement;

	public componentWillLoad() {
		this.watchLabel(this.component.label);
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
