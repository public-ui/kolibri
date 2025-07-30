export abstract class BaseController<State> {
	protected constructor(protected readonly component: { [K in keyof State]: State[K] }) {}

	public setState<K extends keyof State>(prop: K, value: State[K]): void {
		this.component[prop] = value;
	}
}
