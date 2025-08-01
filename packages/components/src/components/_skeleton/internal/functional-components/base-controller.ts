import type { ComponentInterface } from './generic-types';

export abstract class BaseController<RenderProps> {
	public constructor(protected readonly component: ComponentInterface<RenderProps>) {}

	public setRenderPropsOrStates<K extends keyof RenderProps>(prop: K, value: RenderProps[K]): void {
		this.component[prop] = value;
	}
}
