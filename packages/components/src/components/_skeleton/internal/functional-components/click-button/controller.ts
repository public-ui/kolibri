import { BaseController } from '../base-controller';
import type { ControllerInterface } from '../generic-types';
import type { ClickButtonCallbacks, ClickButtonRefs } from './component';

export class ClickButtonController<State extends { show: boolean }>
	extends BaseController<State>
	implements ControllerInterface<ClickButtonCallbacks, ClickButtonRefs>
{
	private buttonRef?: HTMLButtonElement;

	public setButtonRef = (element?: HTMLButtonElement): void => {
		this.buttonRef = element;
	};

	public handleClick = (): void => {
		this.setState('show', !this.component.show);
		// eslint-disable-next-line no-console
		console.log(this.buttonRef);
	};
}
