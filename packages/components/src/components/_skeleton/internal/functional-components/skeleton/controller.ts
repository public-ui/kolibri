import { BaseController } from '../base-controller';
import type { ControllerInterface } from '../generic-types';
import { ClickButtonController } from '../click-button/controller';
import type { SkeletonCallbacks, SkeletonRefs, SkeletonState } from './component';

export class SkeletonController<State extends SkeletonState> extends BaseController<State> implements ControllerInterface<SkeletonCallbacks, SkeletonRefs> {
	private readonly clickButtonController = new ClickButtonController<State>(this.component);

	public handleClick = (): void => {
		// eslint-disable-next-line no-console
		console.log(this, 'button clicked');
	};

	public setButtonRef = (element?: HTMLButtonElement): void => {
		this.clickButtonController.setButtonRef(element);
	};
}
