import { BaseController } from '../base-controller';
import type { ControllerInterface } from '../generic-types';
import type { ClickButtonCallbacks, ClickButtonRefs, ClickButtonState } from './component';

export class ClickButtonController<State extends ClickButtonState>
	extends BaseController<State>
	implements ControllerInterface<ClickButtonCallbacks, ClickButtonRefs>
{
	private buttonRef?: HTMLButtonElement;

	public handleClick = (): void => {
		// eslint-disable-next-line no-console
		console.log(this, this.buttonRef, 'button clicked');
	};

	public setButtonRef = (element?: HTMLButtonElement): void => {
		this.buttonRef = element;
	};
}
