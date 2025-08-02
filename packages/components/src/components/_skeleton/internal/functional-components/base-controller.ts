export abstract class BaseController<Host> {
	public constructor(protected readonly component: Host) {}

	public setRenderPropsOrStates<K extends keyof Host>(prop: K, value: Host[K]): void {
		this.component[prop] = value;
	}
}
