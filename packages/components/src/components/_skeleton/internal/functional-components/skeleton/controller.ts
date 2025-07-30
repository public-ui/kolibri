import { BaseController } from '../base-controller';
import type { ControllerInterface } from '../generic-types';
import type { SkeletonCallbacks, SkeletonRefs, SkeletonState } from './component';

export class SkeletonController<State extends SkeletonState> extends BaseController<State> implements ControllerInterface<SkeletonCallbacks, SkeletonRefs> {
	private buttonRef?: HTMLButtonElement;

	public constructor(component: { [K in keyof State]: State[K] }) {
		super(component);
	}

	public setButtonRef = (element?: HTMLButtonElement): void => {
		this.buttonRef = element;
	};

	public handleClick = (): void => {
		this.setState('show', !this.component.show);
		// eslint-disable-next-line no-console
		console.log(this.buttonRef);
	};
}
