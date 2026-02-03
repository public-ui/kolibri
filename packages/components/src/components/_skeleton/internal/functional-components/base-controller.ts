import type { ComponentApi, NotNullableFields, ResolvedProps } from './generic-types';

export abstract class BaseController<Api extends ComponentApi> {
	public constructor(
		protected readonly component: NonNullable<Api['States']>,
		private readonly props: NotNullableFields<ResolvedProps<Api>>,
	) {}

	protected setProp<K extends keyof ResolvedProps<Api>>(key: K, value: NotNullableFields<ResolvedProps<Api>>[K]): void {
		this.props[key] = value;
	}

	public getProps(): NotNullableFields<ResolvedProps<Api>> {
		return this.props;
	}

	protected setState<K extends keyof NonNullable<Api['States']>>(key: K, value: NonNullable<Api['States']>[K]): void {
		this.component[key as string] = value;
	}
}
