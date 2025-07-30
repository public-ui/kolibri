import { BaseController } from '../base-controller';
import type { ControllerInterface } from '../generic-types';
import { ClickButtonController } from '../click-button/controller';
import type { SkeletonCallbacks, SkeletonRefs, SkeletonState } from './component';

export class SkeletonController<State extends SkeletonState> extends BaseController<State> implements ControllerInterface<SkeletonCallbacks, SkeletonRefs> {
	public readonly clickController: ClickButtonController<State>;

	public constructor(component: { [K in keyof State]: State[K] }) {
		super(component);
		this.clickController = new ClickButtonController(component);
	}

	public setSpanRef = (_element?: HTMLSpanElement): void => {
		void _element;
	};
}
