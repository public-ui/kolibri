import type { NotNullableFields, WebComponentInterface } from './generic-types';

export abstract class BaseController<Props extends Record<never, never>, States extends Record<never, never>> {
	public constructor(
		protected readonly component: States,
		private readonly props: NotNullableFields<Props>,
	) {}

	protected setProp<K extends keyof Props>(key: K, value: NotNullableFields<Props>[K]): void {
		this.props[key] = value;
	}

	protected setProps(values: Partial<NotNullableFields<Props>>): void {
		Object.assign(this.props, values);
	}

	public getProps(): NotNullableFields<Props> {
		return this.props;
	}

	protected setState<K extends keyof States>(key: K, value: WebComponentInterface<Record<never, never>, States>[K]): void {
		this.component[key] = value;
	}

	protected setStates(values: Partial<WebComponentInterface<Record<never, never>, States>>): void {
		Object.assign(this.component, values);
	}
}
