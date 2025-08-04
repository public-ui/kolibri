import type { NotNullableFields, WebComponentInterface } from './generic-types';

export abstract class BaseController<Props, States> {
	public constructor(
		private readonly component: WebComponentInterface<Props, States>,
		private readonly props: NotNullableFields<Props>,
	) {}

	protected setProp<K extends keyof Props>(key: K, value: NotNullableFields<Props>[K]): void {
		this.props[key] = value;
	}

	public getProps(): NotNullableFields<Props> {
		return this.props;
	}

	protected setState<K extends keyof States>(key: K, value: WebComponentInterface<Props, States>[K]): void {
		this.component[key] = value;
	}
}
