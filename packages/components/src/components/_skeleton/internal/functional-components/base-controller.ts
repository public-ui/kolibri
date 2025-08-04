import type { NotNullableFields, WebComponentInterface } from './generic-types';

export abstract class BaseController<Props, States> {
	public constructor(
		protected readonly component: States,
		private readonly props: NotNullableFields<Props>,
	) {}

	protected setProp<K extends keyof Props>(key: K, value: NotNullableFields<Props>[K]): void {
		this.props[key] = value;
	}

	public getProps(): NotNullableFields<Props> {
		return this.props;
	}

	protected setState<K extends keyof States>(key: K, value: WebComponentInterface<Record<never, never>, States>[K]): void {
		this.component[key] = value;
	}
}
