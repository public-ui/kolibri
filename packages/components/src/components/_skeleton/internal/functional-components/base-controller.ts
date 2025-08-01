import type { ComponentInterface } from './generic-types';

export abstract class BaseController<RenderProps, Host extends ComponentInterface<RenderProps> = ComponentInterface<RenderProps>> {
	public constructor(protected readonly component: Host) {}

	public setRenderPropsOrStates<K extends keyof RenderProps>(prop: K, value: RenderProps[K]): void {
		(this.component as ComponentInterface<RenderProps>)[prop] = value;
	}
}
